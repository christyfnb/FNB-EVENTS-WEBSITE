# FNB Frontend Director Workflow

This workflow governs every frontend, UI, layout, motion, interactive, and visual component task across the FNB Events codebase.

## Workflow Execution Steps

1. **Classify Requested Visual Task**
   - Classify as: Static Layout, Simple Motion, Complex Timeline, Scroll Synchronization, Frame-Sequence Cinema, Realtime 3D, or Custom GPU Effect.
   - Respect the FNB Visual North Star: Obsidian Environment + Molten Orange Signal + Editorial Scale + Architectural Grid + Cinematic Controlled Motion + Premium Negative Space + Restraint.

2. **Inspect Existing Implementation**
   - Inspect authoritative baseline components under `components/fnb/` and binding design reference documents.
   - Reuse established FNB design tokens, typography scales, spacing, and layout primitives.

3. **Select Minimum Necessary Skill Set**
   - Default stack: `fnb-nextjs-tech-stack`, `fnb-component-architecture`, `fnb-design-techniques`.
   - Specialist skill loading: Load only necessary specialists (e.g., `frontend-design`, `better-typography`, `tailwind-design-system`, `shadcn`, `web-design-guidelines`, `ui-ux-pro-max`, `taste`, `frontend-a11y`).

4. **Select Implementation Technology**
   - Priority sequence: HTML/CSS → GSAP → ScrollTrigger → Canvas Sequence (`fnb-scroll-canvas`) → Three.js / WebGL.
   - If a simpler technology produces equivalent quality with superior performance, use the simpler implementation.

5. **Identify Performance Implications**
   - Evaluate LCP, CLS, INP, client component boundaries, animation render loops, GPU overdraw, and hydration impact.
   - Consult `fnb-motion-performance`, `gsap-performance`, `vercel-react-best-practices`, and `vercel-composition-patterns`.

6. **Identify Accessibility Implications**
   - Consult `frontend-a11y`. Ensure keyboard navigation, visible focus indicators, semantic landmarks, high contrast ratios, and `prefers-reduced-motion` compliance.

7. **Define Mobile & Fallback Behavior**
   - Define exact responsive behavior across canonical viewports (390×844, 430×932, 768×1024, 1440×900, 1920×1080).
   - Ensure graceful degradation and static/2D fallbacks for complex animations and WebGL elements.

8. **Implement Only If Authorized**
   - Enforce explicit user approval before executing any complex visual refactoring or architecture change.

9. **Run Relevant QA**
   - Execute static analysis, unit tests, media audits, HTTP route checks, and `scripts/browser-qa.mjs`.

10. **Provide Verification Evidence**
    - Provide complete, empirical command outputs for all quality gates before declaring completion (`verification-before-completion`).
