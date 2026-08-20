---
name: fnb-scroll-canvas
description: Use when building FNB sticky scroll cinema, canvas frame sequences, sketch-to-build transformations, tunnel sequences, scroll annotations, or scroll-synchronized storytelling.
---

# FNB Scroll Canvas Cinema

## Core rule
Use frame-sequence scroll cinema only when the story materially benefits from a controlled transformation over scroll distance.

## Use when
- Building sticky cinematic sections, canvas frame sequences, sketch-to-build transformations, tunnel sequences, scroll annotations, or scroll-synchronized visual storytelling.

## FNB signature use cases
- Exhibition concept → engineering → fabrication → installation → completed booth.
- Event setup → technical build → live show → final brand environment.
- Physical experience → digital system transition.

## Architecture
- Tall scroll section creates timeline distance.
- Sticky 100vh viewport owns the visual.
- Normalize progress to `0..1`.
- Derive frame index from progress.
- Draw frame directly to canvas using cover-fit crop logic.
- Use threshold zones for annotations and CTA states.
- Throttle high-frequency scroll work with one `requestAnimationFrame` callback at a time.

## Production improvements
Do not automatically block the page while preloading 100+ frames. Evaluate staged loading: critical opening frames → near-future frames → remaining frames during idle time. Measure memory and mobile network cost.

## Hard rules
- No React state update on every scroll tick.
- No frame sequences without mobile crop testing.
- Respect `prefers-reduced-motion` with a still/short transition alternative.
- Verify canvas DPR scaling without exhausting memory on high-DPR mobile devices.

## Reference
Read `reference.md` for the uploaded progress math, frame indexing, annotation windows, and canvas examples.
