'use client'

import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { enquiryProvider } from '@/lib/enquiry-provider'
import { ENQUIRY_FORM_CONTENT as copy } from '@/lib/task5-institutional-content'

type ErrorKey = 'name' | 'email' | 'projectType' | 'services' | 'message'
type Errors = Partial<Record<ErrorKey, string>>

function value(data: FormData, key: string) {
  return String(data.get(key) ?? '').trim()
}

function buildSummary(data: FormData) {
  const fields = copy.fields
  const lines = [
    [fields.name.label, value(data, 'name')], [fields.company.label, value(data, 'company')],
    [fields.email.label, value(data, 'email')], [fields.phone.label, value(data, 'phone')],
    [fields.projectType.label, value(data, 'projectType')], [fields.services.label, data.getAll('services').join(', ')],
    [fields.location.label, value(data, 'location')], [fields.date.label, value(data, 'date')],
    [fields.scale.label, value(data, 'scale')], [fields.message.label, value(data, 'message')],
  ]
  return lines.filter(([, fieldValue]) => fieldValue).map(([label, fieldValue]) => `${label}: ${fieldValue}`).join('\n')
}

export function ProjectEnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [summary, setSummary] = useState('')
  const [announcement, setAnnouncement] = useState('')

  async function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = formRef.current
    if (!form) return
    const data = new FormData(form)
    const nextErrors: Errors = {}
    if (!value(data, 'name')) nextErrors.name = copy.fields.name.error
    if (!/^\S+@\S+\.\S+$/.test(value(data, 'email'))) nextErrors.email = copy.fields.email.error
    if (!value(data, 'projectType')) nextErrors.projectType = copy.fields.projectType.error
    if (data.getAll('services').length === 0) nextErrors.services = copy.fields.services.error
    if (!value(data, 'message')) nextErrors.message = copy.fields.message.error
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      const field = firstError === 'services' ? form.querySelector<HTMLElement>('[name="services"]') : form.elements.namedItem(firstError)
      if (field instanceof HTMLElement) field.focus()
      setSummary('')
      return
    }
    const delivery = await enquiryProvider.getDeliveryState()
    if (delivery.delivery !== 'NOT_SENT') throw new Error('Enquiry delivery must remain NOT_SENT')
    setSummary(buildSummary(data))
    setAnnouncement(copy.review.notice)
    requestAnimationFrame(() => reviewHeadingRef.current?.focus())
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary)
      setAnnouncement(copy.review.copied)
    } catch {
      setAnnouncement(copy.review.copyFailed)
    }
  }

  const describedBy = (key: ErrorKey, helpId: string) => `${helpId}${errors[key] ? ` ${key}-error` : ''}`
  const inputClass = 'mt-3 w-full border border-steel bg-void px-4 py-3 text-warm-white outline-none transition-colors focus:border-signal'

  return (
    <section aria-labelledby="enquiry-form-heading" className="border-b border-steel/40 bg-obsidian">
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24">
        <p id="enquiry-required-note" className="fnb-label text-signal">{copy.requiredNote}</p>
        <form ref={formRef} noValidate onSubmit={handleReview} className="mt-10 space-y-10">
          <div className="grid gap-8 md:grid-cols-2">
            <Field name="name" type="text" autoComplete="name" error={errors.name} />
            <Field name="company" type="text" autoComplete="organization" />
            <Field name="email" type="email" autoComplete="email" error={errors.email} />
            <Field name="phone" type="tel" autoComplete="tel" />
          </div>

          <div>
            <label htmlFor="projectType" className="fnb-label text-warm-white">{copy.fields.projectType.label}</label>
            <select id="projectType" name="projectType" defaultValue="" aria-required="true" aria-invalid={Boolean(errors.projectType)} aria-describedby={describedBy('projectType', 'projectType-help')} className={inputClass}>
              <option value="" disabled>{copy.fields.projectType.help}</option>
              {copy.fields.projectType.options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <HelpAndError name="projectType" error={errors.projectType} />
          </div>

          <fieldset aria-describedby={describedBy('services', 'services-help')} aria-invalid={Boolean(errors.services)}>
            <legend className="fnb-label text-warm-white">{copy.fields.services.label}</legend>
            <p id="services-help" className="mt-2 text-sm text-ash">{copy.fields.services.help}</p>
            <div className="mt-5 grid gap-px bg-steel/50 sm:grid-cols-2">
              {copy.fields.services.options.map((option) => (
                <label key={option} className="flex min-h-14 cursor-pointer items-center gap-3 bg-void px-4 py-3 text-sm text-mist focus-within:outline-2 focus-within:outline-signal">
                  <input type="checkbox" name="services" value={option} className="h-5 w-5 accent-signal" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.services ? <p id="services-error" role="alert" className="mt-2 text-sm text-signal-hot">{errors.services}</p> : null}
          </fieldset>

          <div className="grid gap-8 md:grid-cols-3">
            <Field name="location" type="text" autoComplete="off" />
            <Field name="date" type="date" autoComplete="off" />
            <Field name="scale" type="text" autoComplete="off" />
          </div>

          <div>
            <label htmlFor="message" className="fnb-label text-warm-white">{copy.fields.message.label}</label>
            <textarea id="message" name="message" rows={7} aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message', 'message-help')} className={inputClass} />
            <HelpAndError name="message" error={errors.message} />
          </div>

          <button type="button" onClick={() => formRef.current?.requestSubmit()} className="fnb-btn-primary">{copy.actions.review}</button>
        </form>

        {summary ? (
          <section aria-labelledby="enquiry-review-heading" className="mt-16 border-l-2 border-signal bg-void p-6 md:p-10">
            <h2 ref={reviewHeadingRef} id="enquiry-review-heading" tabIndex={-1} className="fnb-head text-3xl text-warm-white">{copy.review.heading}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-mist">{copy.review.notice}</p>
            <textarea readOnly value={summary} aria-label={copy.review.heading} rows={14} className="mt-8 w-full border border-steel bg-obsidian p-4 font-mono text-sm leading-relaxed text-mist" />
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={copySummary} className="fnb-btn-primary">{copy.actions.copy}</button>
              <button type="button" onClick={() => { setSummary(''); requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('input')?.focus()) }} className="fnb-btn-ghost">{copy.actions.edit}</button>
            </div>
          </section>
        ) : null}
        <p role="status" aria-live="polite" aria-atomic="true" className="mt-6 text-sm text-signal-hot">{announcement}</p>
        <p className="mt-3 font-mono text-xs text-ash">{copy.provider.configuration} · {copy.provider.delivery} · {copy.provider.label}</p>
      </div>
    </section>
  )
}

function Field({ name, type, autoComplete, error }: { name: Exclude<keyof typeof copy.fields, 'projectType' | 'services' | 'message'>; type: string; autoComplete: string; error?: string }) {
  const field = copy.fields[name]
  const helpId = `${name}-help`
  return (
    <div>
      <label htmlFor={name} className="fnb-label text-warm-white">{field.label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} aria-required={field.required || undefined} aria-invalid={Boolean(error)} aria-describedby={`${helpId}${error ? ` ${name}-error` : ''}`} className="mt-3 w-full border border-steel bg-void px-4 py-3 text-warm-white outline-none transition-colors focus:border-signal" />
      <p id={helpId} className="mt-2 text-sm text-ash">{field.help}</p>
      {error ? <p id={`${name}-error`} role="alert" className="mt-2 text-sm text-signal-hot">{error}</p> : null}
    </div>
  )
}

function HelpAndError({ name, error }: { name: 'projectType' | 'message'; error?: string }) {
  return <><p id={`${name}-help`} className="mt-2 text-sm text-ash">{copy.fields[name].help}</p>{error ? <p id={`${name}-error`} role="alert" className="mt-2 text-sm text-signal-hot">{error}</p> : null}</>
}
