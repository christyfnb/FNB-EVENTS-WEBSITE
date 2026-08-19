import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { ENQUIRY_FORM_CONTENT } from '../lib/task5-institutional-content.ts'
import { CANONICAL_ROUTES, HOME_SECTION_IDS } from './production-audit.mjs'

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]
const ROUTE_VIEWPORTS = [VIEWPORTS[0], VIEWPORTS[3]]
const REPRESENTATIVE_ROUTES = new Set([
  '/',
  '/services/event-production',
  '/about',
  '/team',
  '/project-enquiry',
  '/privacy-policy',
])

const delay = (milliseconds) => new Promise((accept) => setTimeout(accept, milliseconds))
const APPROVED_COPY_STATUSES = [
  ENQUIRY_FORM_CONTENT.review.copied,
  ENQUIRY_FORM_CONTENT.review.copyFailed,
]

export function auditEnquiryCopyOutcome(outcome, approvedStatuses = APPROVED_COPY_STATUSES) {
  const errors = []
  if (!outcome.controlFound) errors.push('enquiry copy control was not found')
  if (!outcome.invoked) errors.push('enquiry copy control was not invoked')
  if (!approvedStatuses.includes(outcome.status)) errors.push(`enquiry copy status is not an approved terminal outcome: ${outcome.status || '<empty>'}`)
  if (!outcome.providerText) errors.push('enquiry copy state does not expose NOT_SENT')
  if (!outcome.noSuccess) errors.push('enquiry copy state presents a delivery success claim')
  return errors
}

class Cdp {
  constructor(url) {
    this.id = 0
    this.pending = new Map()
    this.listeners = new Map()
    this.socket = new WebSocket(url)
  }

  async open() {
    if (this.socket.readyState === WebSocket.OPEN) return
    await new Promise((accept, reject) => {
      this.socket.addEventListener('open', accept, { once: true })
      this.socket.addEventListener('error', reject, { once: true })
    })
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(String(event.data))
      if (message.id) {
        const pending = this.pending.get(message.id)
        if (!pending) return
        this.pending.delete(message.id)
        if (message.error) pending.reject(new Error(message.error.message))
        else pending.accept(message.result)
        return
      }
      for (const listener of this.listeners.get(message.method) ?? []) listener(message.params)
    })
  }

  send(method, params = {}) {
    const id = ++this.id
    return new Promise((accept, reject) => {
      this.pending.set(id, { accept, reject })
      this.socket.send(JSON.stringify({ id, method, params }))
    })
  }

  once(method, timeout = 15000) {
    return new Promise((accept, reject) => {
      const listeners = this.listeners.get(method) ?? new Set()
      const done = (params) => {
        clearTimeout(timer)
        listeners.delete(done)
        accept(params)
      }
      listeners.add(done)
      this.listeners.set(method, listeners)
      const timer = setTimeout(() => {
        listeners.delete(done)
        reject(new Error(`Timed out waiting for ${method}`))
      }, timeout)
    })
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) ?? new Set()
    listeners.add(listener)
    this.listeners.set(method, listeners)
  }

  close() {
    this.socket.close()
  }
}

function argument(name) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : undefined
}

function slug(route) {
  return route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')
}

async function waitForJson(url, timeout = 15000) {
  const deadline = Date.now() + timeout
  let lastError
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      if (response.ok) return response.json()
    } catch (error) {
      lastError = error
    }
    await delay(150)
  }
  throw new Error(`Browser debugging endpoint unavailable: ${lastError?.message ?? url}`)
}

async function evaluate(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
  return result.result.value
}

async function navigate(cdp, url) {
  const loaded = cdp.once('Page.loadEventFired')
  await cdp.send('Page.navigate', { url })
  await loaded
  await delay(350)
}

async function waitForPath(cdp, expected, timeout = 15000) {
  const deadline = Date.now() + timeout
  while (Date.now() < deadline) {
    if (await evaluate(cdp, 'location.pathname') === expected) {
      await delay(200)
      return
    }
    await delay(50)
  }
  throw new Error(`Timed out waiting for route ${expected}`)
}

async function viewport(cdp, width, height) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  })
}

async function screenshot(cdp, path) {
  const result = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false })
  await writeFile(path, Buffer.from(result.data, 'base64'))
}

async function pageState(cdp) {
  return evaluate(cdp, `(() => ({
    url: location.pathname + location.hash,
    title: document.title,
    textLength: document.body.innerText.trim().length,
    mainCount: document.querySelectorAll('main').length,
    h1Count: document.querySelectorAll('h1').length,
    headerCount: document.querySelectorAll('header').length,
    footerCount: document.querySelectorAll('footer').length,
    images: document.images.length,
    brokenImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
    overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth,
    overlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay, .next-error-h1')),
    homeSections: Array.from(document.querySelectorAll('[data-home-section]')).map((element) => element.dataset.homeSection),
  }))()`)
}

function stateErrors(route, size, state, requireHomeSections = false) {
  const prefix = `${route} @ ${size.width}x${size.height}`
  const errors = []
  if (!state.textLength) errors.push(`${prefix}: blank page`)
  for (const [key, expected] of [['mainCount', 1], ['h1Count', 1], ['headerCount', 1], ['footerCount', 1]]) {
    if (state[key] !== expected) errors.push(`${prefix}: ${key} expected ${expected}; found ${state[key]}`)
  }
  if (state.brokenImages.length) errors.push(`${prefix}: ${state.brokenImages.length} broken rendered images`)
  if (state.overflow > 1) errors.push(`${prefix}: horizontal overflow ${state.overflow}px`)
  if (state.overlay) errors.push(`${prefix}: framework error overlay found`)
  if (requireHomeSections && JSON.stringify(state.homeSections) !== JSON.stringify(HOME_SECTION_IDS)) {
    errors.push(`${prefix}: homepage section markers missing or out of order`)
  }
  return errors
}

async function runBrowserQa({ baseUrl, browserExecutable, artifactDir }) {
  await mkdir(artifactDir, { recursive: true })
  const debugPort = Number(argument('--debug-port') ?? 9236)
  const profileDir = join(artifactDir, 'chromium-profile')
  const browserLog = join(artifactDir, 'browser-process.log')
  const browser = spawn(browserExecutable, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profileDir}`,
    'about:blank',
  ], { windowsHide: true })
  let processLog = ''
  browser.stdout?.on('data', (chunk) => { processLog += chunk })
  browser.stderr?.on('data', (chunk) => { processLog += chunk })

  const report = {
    startedAt: new Date().toISOString(),
    baseUrl,
    browser: basename(browserExecutable),
    viewports: VIEWPORTS,
    routeChecks: [],
    interactions: [],
    consoleErrors: [],
    expectedConsoleEvents: [],
    errors: [],
  }
  let cdp
  try {
    await waitForJson(`http://127.0.0.1:${debugPort}/json/version`)
    const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' })
    const target = await targetResponse.json()
    cdp = new Cdp(target.webSocketDebuggerUrl)
    await cdp.open()
    await Promise.all([
      cdp.send('Page.enable'),
      cdp.send('Runtime.enable'),
      cdp.send('Log.enable'),
      cdp.send('Network.enable'),
    ])
    let currentCheck = 'startup'
    cdp.on('Runtime.exceptionThrown', (params) => report.consoleErrors.push({ check: currentCheck, type: 'exception', text: params.exceptionDetails?.text ?? 'Runtime exception' }))
    cdp.on('Log.entryAdded', ({ entry }) => {
      if (entry.level !== 'error') return
      const event = { check: currentCheck, type: 'log', text: entry.text, url: entry.url }
      if (currentCheck === 'branded 404' && entry.url === new URL('/__task-6-branded-404-check__', baseUrl).href && /404/.test(entry.text)) {
        report.expectedConsoleEvents.push(event)
      } else {
        report.consoleErrors.push(event)
      }
    })

    for (const size of VIEWPORTS) {
      await viewport(cdp, size.width, size.height)
      currentCheck = `/ @ ${size.width}x${size.height}`
      await navigate(cdp, new URL('/', baseUrl).href)
      const state = await pageState(cdp)
      report.errors.push(...stateErrors('/', size, state, true))
      report.routeChecks.push({ route: '/', viewport: size, ...state })
      await screenshot(cdp, join(artifactDir, `home-${size.width}x${size.height}.png`))
    }

    for (const size of ROUTE_VIEWPORTS) {
      await viewport(cdp, size.width, size.height)
      for (const route of CANONICAL_ROUTES) {
        currentCheck = `${route} @ ${size.width}x${size.height}`
        await navigate(cdp, new URL(route, baseUrl).href)
        const state = await pageState(cdp)
        report.errors.push(...stateErrors(route, size, state, route === '/'))
        report.routeChecks.push({ route, viewport: size, ...state })
        if (REPRESENTATIVE_ROUTES.has(route)) {
          await screenshot(cdp, join(artifactDir, `${slug(route)}-${size.width}x${size.height}.png`))
        }
      }
    }

    await viewport(cdp, 390, 844)
    currentCheck = 'mobile navigation'
    await navigate(cdp, new URL('/', baseUrl).href)
    const mobileNavigation = await evaluate(cdp, `(async () => {
      const toggle = document.querySelector('button[aria-controls="fnb-mobile-nav"]');
      toggle.click();
      await new Promise((accept) => requestAnimationFrame(() => requestAnimationFrame(accept)));
      return {
        expanded: toggle.getAttribute('aria-expanded'),
        menu: Boolean(document.querySelector('#fnb-mobile-nav')),
        firstLinkFocused: document.activeElement === document.querySelector('#fnb-mobile-nav a'),
      };
    })()`)
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' })
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' })
    await delay(100)
    const mobileClosed = await evaluate(cdp, `({ menu: Boolean(document.querySelector('#fnb-mobile-nav')), toggleFocused: document.activeElement === document.querySelector('button[aria-controls="fnb-mobile-nav"]') })`)
    report.interactions.push({ name: 'mobile navigation open/focus/Escape', open: mobileNavigation, closed: mobileClosed })
    if (mobileNavigation.expanded !== 'true' || !mobileNavigation.menu || !mobileNavigation.firstLinkFocused || mobileClosed.menu || !mobileClosed.toggleFocused) {
      report.errors.push('mobile navigation: open/focus/Escape contract failed')
    }

    await evaluate(cdp, `document.querySelector('button[aria-controls="fnb-mobile-nav"]').click()`)
    await evaluate(cdp, `document.querySelector('#fnb-mobile-nav a[href="/services"]').click()`)
    await waitForPath(cdp, '/services')
    const mobileRoute = await evaluate(cdp, 'location.pathname')
    report.interactions.push({ name: 'mobile navigation route action', route: mobileRoute })
    if (mobileRoute !== '/services') report.errors.push(`mobile navigation route action: expected /services; found ${mobileRoute}`)

    await viewport(cdp, 1440, 900)
    currentCheck = 'desktop navigation'
    await navigate(cdp, new URL('/', baseUrl).href)
    await evaluate(cdp, `document.querySelector('nav[aria-label="Primary"] a[href="/services"]').click()`)
    await waitForPath(cdp, '/services')
    const desktopRoute = await evaluate(cdp, 'location.pathname')
    report.interactions.push({ name: 'desktop navigation route action', route: desktopRoute })
    if (desktopRoute !== '/services') report.errors.push(`desktop navigation route action: expected /services; found ${desktopRoute}`)

    currentCheck = 'process anchor'
    await navigate(cdp, new URL('/#process', baseUrl).href)
    const processAnchor = await evaluate(cdp, `({ hash: location.hash, exists: Boolean(document.querySelector('#process')) })`)
    report.interactions.push({ name: 'homepage process anchor', ...processAnchor })
    if (processAnchor.hash !== '#process' || !processAnchor.exists) report.errors.push('homepage process anchor failed')

    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    currentCheck = 'reduced motion'
    await navigate(cdp, new URL('/', baseUrl).href)
    const reducedMotion = await evaluate(cdp, `({
      matches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      signalAnimation: getComputedStyle(document.querySelector('.fnb-signal-path')).animationName,
      scrollAnimation: getComputedStyle(document.querySelector('.fnb-scroll-cue')).animationName,
    })`)
    report.interactions.push({ name: 'reduced motion', ...reducedMotion })
    if (!reducedMotion.matches || reducedMotion.signalAnimation !== 'none' || reducedMotion.scrollAnimation !== 'none') report.errors.push('reduced-motion state failed')
    await cdp.send('Emulation.setEmulatedMedia', { features: [] })

    currentCheck = 'keyboard focus visible'
    await navigate(cdp, new URL('/', baseUrl).href)
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab' })
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab' })
    const keyboardFocus = await evaluate(cdp, `({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim(), visible: document.activeElement?.matches(':focus-visible') })`)
    report.interactions.push({ name: 'keyboard focus visible', ...keyboardFocus })
    if (!keyboardFocus.visible) report.errors.push('keyboard-visible focus state failed')

    currentCheck = 'team portraits'
    await navigate(cdp, new URL('/team', baseUrl).href)
    await evaluate(cdp, `(async () => {
      for (const image of document.querySelectorAll('img[src*="portrait-"]')) {
        image.scrollIntoView({ block: 'center' });
        try { await image.decode(); } catch {}
      }
      window.scrollTo(0, 0);
    })()`)
    const team = await evaluate(cdp, `({
      portraits: document.querySelectorAll('img[src*="portrait-"]').length,
      unique: new Set(Array.from(document.querySelectorAll('img[src*="portrait-"]')).map((image) => new URL(image.currentSrc || image.src).searchParams.get('url') || image.src)).size,
      broken: Array.from(document.querySelectorAll('img[src*="portrait-"]')).filter((image) => !image.complete || image.naturalWidth === 0).length,
    })`)
    report.interactions.push({ name: 'team portrait runtime', ...team })
    if (team.portraits !== 23 || team.unique !== 23 || team.broken) report.errors.push(`team portraits failed: ${JSON.stringify(team)}`)

    currentCheck = 'enquiry validation and review'
    await navigate(cdp, new URL('/project-enquiry', baseUrl).href)
    const validation = await evaluate(cdp, `(async () => {
      document.querySelector('button.fnb-btn-primary').click();
      await new Promise((accept) => setTimeout(accept, 100));
      return { alerts: document.querySelectorAll('[role="alert"]').length, focus: document.activeElement?.id };
    })()`)
    const review = await evaluate(cdp, `(async () => {
      const approvedStatuses = ${JSON.stringify(APPROVED_COPY_STATUSES)};
      const set = (selector, value) => { const element = document.querySelector(selector); element.value = value; element.dispatchEvent(new Event('input', { bubbles: true })); element.dispatchEvent(new Event('change', { bubbles: true })); };
      set('#name', 'QA Reviewer'); set('#email', 'qa@example.test'); set('#projectType', document.querySelectorAll('#projectType option')[1].value); set('#message', 'A truth-safe local QA enquiry brief.');
      const service = document.querySelector('input[name="services"]'); service.checked = true; service.dispatchEvent(new Event('change', { bubbles: true }));
      document.querySelector('button.fnb-btn-primary').click();
      await new Promise((accept) => setTimeout(accept, 150));
      const copyButton = Array.from(document.querySelectorAll('button')).find((button) => /copy/i.test(button.textContent));
      let invoked = false;
      if (copyButton) {
        copyButton.click();
        invoked = true;
        for (let attempt = 0; attempt < 40; attempt += 1) {
          const status = document.querySelector('[role="status"]')?.textContent?.trim();
          if (approvedStatuses.includes(status)) break;
          await new Promise((accept) => setTimeout(accept, 50));
        }
      }
      return {
        review: Boolean(document.querySelector('#enquiry-review-heading')),
        controlFound: Boolean(copyButton),
        invoked,
        providerText: document.body.innerText.includes('NOT_SENT'),
        noSuccess: !/successfully sent|submitted successfully/i.test(document.body.innerText),
        status: document.querySelector('[role="status"]')?.textContent?.trim(),
      };
    })()`)
    report.interactions.push({ name: 'enquiry validation', ...validation }, { name: 'enquiry review/copy/NOT_SENT', ...review })
    if (validation.alerts < 5 || validation.focus !== 'name') report.errors.push(`enquiry validation failed: ${JSON.stringify(validation)}`)
    if (!review.review) report.errors.push(`enquiry review failed: ${JSON.stringify(review)}`)
    report.errors.push(...auditEnquiryCopyOutcome(review))

    currentCheck = 'branded 404'
    await navigate(cdp, new URL('/__task-6-branded-404-check__', baseUrl).href)
    const notFound = await evaluate(cdp, `({ branded: Boolean(document.querySelector('[data-institutional-route="not-found"]')), overlay: Boolean(document.querySelector('[data-nextjs-dialog], .next-error-h1')) })`)
    report.interactions.push({ name: 'branded 404', ...notFound })
    if (!notFound.branded || notFound.overlay) report.errors.push('branded 404 browser check failed')
    await screenshot(cdp, join(artifactDir, 'branded-404-1440x900.png'))

    if (report.consoleErrors.length) {
      report.errors.push(`critical browser console/page errors: ${report.consoleErrors.length}`)
    }
  } finally {
    report.completedAt = new Date().toISOString()
    await writeFile(join(artifactDir, 'browser-qa-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
    await writeFile(browserLog, String(processLog), 'utf8')
    if (cdp) {
      try { await cdp.send('Browser.close') } catch {}
      cdp.close()
    }
    if (!browser.killed) browser.kill()
  }
  return report
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const baseUrl = argument('--base-url')
  const browserExecutable = argument('--browser-executable')
  const artifactDir = resolve(argument('--artifact-dir') ?? '.superpowers/sdd/owner-execution-unlock/task-6-qa')
  if (!baseUrl || !browserExecutable) {
    console.error('Usage: node scripts/browser-qa.mjs --base-url <owned-server> --browser-executable <installed Chromium/Edge> [--artifact-dir <ignored-path>]')
    process.exitCode = 1
  } else {
    const report = await runBrowserQa({ baseUrl, browserExecutable, artifactDir })
    if (report.errors.length) {
      console.error(report.errors.map((error) => `- ${error}`).join('\n'))
      process.exitCode = 1
    } else {
      console.log(`Browser QA passed: ${report.routeChecks.length} rendered route/viewport checks and ${report.interactions.length} interaction checks`)
    }
  }
}
