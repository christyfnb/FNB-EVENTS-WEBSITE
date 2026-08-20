---
name: fnb-motion-techniques
description: Use when implementing FNB section reveals, spring transitions, stagger, enter-exit motion, SVG animation, CSS 3D, ambient loops, or other interface motion.
---

# FNB Motion Techniques

## Core rule
Motion must clarify hierarchy, reveal state, communicate transformation, or strengthen spatial storytelling. Never animate simply because an example exists.

## Use when
- Implementing section reveals, spring transitions, stagger, mount/unmount motion, CSS 3D, SVG path motion, continuous loops, or threshold-based animation.

## Preferred patterns
- Scroll reveals: restrained opacity/translate with `whileInView`, usually once.
- Springs: use physically weighted settings; tune by interaction rather than copying one constant everywhere.
- Frequent scroll toggles: prefer CSS transitions when JavaScript animation adds no value.
- `AnimatePresence`: reserve for genuine enter/exit state.
- Infinite loops: only for ambient or system-state storytelling; respect reduced motion.
- CSS 3D/SVG paths: use for purposeful technical or spatial diagrams, not decoration.

## FNB visual guardrails
- Preserve obsidian/carbon black and molten-orange signal language.
- No generic SaaS micro-animation clutter, bouncing badges, typewriter gimmicks, rotating cubes, or animated charts unless the content specifically calls for them.
- One dominant motion idea per viewport.
- Motion must preserve typography legibility and CTA hierarchy.
- Always provide a reduced-motion path.

## Reference
Read `reference.md` for concrete Framer Motion, CSS 3D, SVG and spring examples.
