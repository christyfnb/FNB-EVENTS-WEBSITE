---
name: fnb-nextjs-tech-stack
description: Use when changing or auditing the FNB Next.js, React, Tailwind, font, icon, animation, third-party-script, dependency, or package configuration.
---

# FNB Next.js Tech Stack Guardrails

## Core rule
Repository state is authoritative. Use this skill as a compatibility and decision guide for FNB Next.js work, never as an instruction to force versions or dependencies.

## Use when
- Auditing or changing Next.js, React, Tailwind, fonts, icons, animation dependencies, third-party scripts, or package scripts.
- Deciding whether an existing FNB dependency should be kept, upgraded, replaced, or avoided.

## FNB guardrails
1. Inspect `package.json`, lockfile, `components.json`, `app/`, and existing providers before changing dependencies.
2. Never downgrade Next.js, React, Tailwind, or TypeScript merely to match the reference document.
3. Never replace the FNB typography, icon set, shadcn base, or motion stack unless the repository has a concrete blocker and the change is justified.
4. Treat Framer Motion, Lenis, Phosphor, Geist, and Calendly as optional reference technologies, not mandatory installs.
5. For Next.js 16 APIs, prefer the repository's installed docs and actual package version.
6. Third-party scripts must be deferred or lazy-loaded where possible.
7. Server Components remain the default; add `"use client"` only where browser APIs, hooks, or interactive motion require it.

## FNB authority order
`AGENTS.md` / FNB design rules → active repository → accepted Fable design → this skill → generic defaults.

## Reference
Read `reference.md` for the uploaded technical stack notes and version examples.
