---
name: fnb-motion-performance
description: Use when implementing or debugging FNB scroll effects, canvas sequences, sticky scenes, parallax, high-frequency animation, large media, or performance-sensitive third-party scripts.
---

# FNB Motion Performance

## Core rule
High-frequency visual work must stay off React's render loop unless the state is discrete and meaningful.

## Use when
- Implementing or debugging scroll effects, canvas sequences, sticky scenes, parallax, high-frequency motion, large media, or third-party scripts.

## Mandatory patterns
- Throttle scroll work with a `ticking` ref + `requestAnimationFrame`.
- Use passive scroll listeners when `preventDefault()` is not needed.
- Store frame-by-frame transient values in refs, not React state.
- Update React state only when discrete visible state actually changes.
- Scale canvas for DPR, but cap/measure memory cost on high-DPR devices.
- Lazy-load noncritical third-party scripts.
- Prefer CSS transitions for simple scroll-toggled states.
- Use `will-change` narrowly; do not promote large parts of the site permanently.

## Media rules
- Deduplicate identical video/image binaries.
- Use poster-first video loading and conservative preload outside the hero.
- Do not preload every image in the website.
- For frame sequences, consider progressive/staged loading rather than unconditional full blocking preload.

## Verification
Profile real desktop and mobile behavior. A visually smooth local desktop run is not sufficient evidence for mobile.

## Reference
Read `reference.md` for the uploaded RAF, refs, canvas, passive listener, and lazy-script examples.
