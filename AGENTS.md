# FNB Events Repository Instructions

These instructions apply to the entire repository. The baseline commit on `main` is the untouched Fable/FNB prototype and is the rollback and visual-comparison authority.

## Design authority

- The binding product reference is `../FNB-DIGITAL-FLAGSHIP-v1.0.3-PREBUILD-FIXED-FULL.pdf`.
- Preserve the approved Fable homepage's composition, section order, design language, typography, spacing, color system, and interaction character unless a later approved phase explicitly changes them.
- Reuse established tokens and components before creating alternatives. Never redesign, normalize, or simplify the Fable implementation incidentally.
- When the document, implementation, and an instruction conflict, stop the affected slice and surface the conflict. Do not silently choose a new design direction.

## Truth and no-hallucination rules

- Never invent or infer clients, projects, venues, event dates, dimensions, budgets, metrics, awards, testimonials, partnerships, team roles, biographies, consent, legal wording, contact details, or integration destinations.
- Treat unverified claims as blocked publication data. Hide, gate, or clearly mark them for internal review rather than presenting them as facts.
- Do not turn reference artwork, generated mockups, dashboards, or conceptual imagery into evidence of delivered FNB work.
- Content registries must distinguish verified facts, approved copy, placeholders, and blocked claims. UI code must consume that status rather than bypass it.

## Media authority

- The approved/categorized source library is the sibling directory beginning `../FNB-WEBSITE-IMAGE-ASSETS-CATEGORIZED`.
- Assets under `01-FINAL-WEBSITE-ASSETS` are source-eligible, not automatically publication-approved. They must also satisfy the flagship document's truth and real-work requirements.
- Team portraits may only come from the categorized web-optimized team set after identity, role, consent, and publication approval are verified. Never publish master portrait files.
- Existing files under `public/media` belong to the visual baseline; they are not proof that an asset is approved for production use.
- Every production asset must be registered with source path, destination, purpose, ownership/approval status, dimensions, and hash before use.

## Prohibited media

- Never use, copy, transform, optimize, publish, or derive from anything inside `02-SOURCE-REFERENCE/02-Original-Replaced-Do-Not-Use`.
- The prohibition follows file content: byte-identical copies, renamed files, and derivatives whose source matches a prohibited hash remain prohibited.
- Do not move, rename, overwrite, or delete source-library assets. Media migration must copy only approved inputs into explicit public destinations.

## Global FNB skill routing

Read the relevant global skill before acting:

- `fnb-codex-workflow`: phase planning, scoped execution, repository instructions, and verification discipline.
- `fnb-nextjs-tech-stack`: Next.js, React, TypeScript, Tailwind, routing, metadata, images, fonts, and framework configuration.
- `fnb-component-architecture`: server/client boundaries, reusable primitives, section composition, and data registries.
- `fnb-design-techniques`: FNB visual tokens, typography, layout, responsive behavior, and design fidelity.
- `fnb-motion-techniques`: interaction motion, reveal behavior, timing, and reduced-motion equivalents.
- `fnb-scroll-canvas`: canvas or frame-sequence work only when an approved phase and approved assets require it.
- `fnb-motion-performance`: animation, scrolling, media, runtime performance, and regression review.

When several apply, use the smallest set that covers the task and reconcile their guidance against this file and the approved flagship document.

## FNB Frontend Skill Router

- Specialist skills are loaded dynamically based on explicit task requirements; generic framework guidance never overrides FNB visual and business authority.
- Technology implementation priority: `HTML/CSS → GSAP → ScrollTrigger → Canvas sequence → Three.js/WebGL`.
- Increased visual or 3D complexity must be explicitly justified by storytelling purpose, performance budgets, accessibility fallbacks, and mobile responsiveness.

## Dependencies and package management

- Use pnpm and the committed lockfile. Reproducible installs use `pnpm install --frozen-lockfile`.
- Do not add, remove, upgrade, downgrade, or replace packages without demonstrated technical need and explicit authorization for that phase.
- Do not change package versions, lockfile resolutions, package-manager policy, or build-script approvals incidentally.
- Prefer the platform, Next.js, React, CSS, and already-installed dependencies before proposing another library.
- Read the installed Next.js 16 documentation in `node_modules/next/dist/docs/` before relying on version-sensitive APIs.

## Motion and performance

- Preserve the accepted motion language. Motion must clarify hierarchy, continuity, or feedback; decorative motion alone is not sufficient.
- Provide a complete `prefers-reduced-motion` path. Reduced-motion users must not download or autoplay nonessential motion media.
- Prefer compositor-friendly `transform` and `opacity`. Avoid layout-thrashing animation and continuous React state updates from scroll or pointer movement.
- Throttle scroll work with `requestAnimationFrame`, use passive listeners where appropriate, clean up observers/listeners/timers, and pause offscreen work.
- Lazy-load below-fold media, reserve intrinsic space, use accurate decoded dimensions, and preload only the true LCP asset.
- Canvas or frame sequences require explicit memory, DPR, mobile, loading, fallback, and reduced-motion budgets before implementation.
- Duplicate media, oversized assets, unregistered public media, and unnecessary client JavaScript are release blockers.

## Accessibility

- Preserve semantic landmarks and heading order. Interactive elements must use native semantics whenever possible.
- All functionality must be keyboard-operable with visible focus states and sensible focus order.
- Provide accurate text alternatives; decorative imagery must use empty alt text. Do not encode essential meaning only in color, motion, hover, or imagery.
- Maintain readable contrast, zoom/reflow behavior, touch targets, form labels, instructions, validation, and error announcements.
- Motion, video, canvas, and autoplay experiences require accessible static or reduced-motion equivalents.

## Verification gates

- The complete browsable-site tranche is authorized for continuous execution. Follow the owner-approved execution order without pausing between internal phases; stop only for a destructive or irreversible action, an unauthorized external side effect, a new dependency requiring approval, or a genuinely impossible blocker.
- Before claiming a phase complete, inspect the diff and run every applicable fresh gate: `git diff --check`, lint, TypeScript, repository audits, production build, route/link checks, and rendered desktop/mobile QA.
- If a required script or environment capability is missing, report the gate as blocked or unverified; never substitute an assumption for a pass.
- Compare rendered work with the baseline at `http://127.0.0.1:3000` and preserve the running baseline server when instructed. Do not kill or replace it without an explicit restart decision.
- Treat console errors, framework overlays, broken links, hydration errors, accessibility regressions, prohibited media matches, truth-registry violations, and material performance regressions as blockers.
- Keep generated QA artifacts and temporary reports out of Git unless a phase explicitly requires committed evidence.

## Deployment and external side effects

- Do not deploy, publish, create a preview deployment, connect production services, send forms or messages, modify DNS, or change external systems without explicit authorization.
- Do not push branches, open pull requests, merge, tag, or rewrite shared history unless the user authorizes that action.
- No package upgrades are allowed without a demonstrated need, recorded impact, verification plan, and explicit approval.
