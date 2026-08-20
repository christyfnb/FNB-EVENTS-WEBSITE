# FNB 3D Performance & Optimization Audit Workflow

This workflow governs performance auditing, resource disposal, GPU memory management, and lifecycle validation for any Three.js, WebGL, GLSL, or Canvas implementation in FNB Events.

## Mandatory Performance Checks

No Three.js or WebGL experience may be considered complete without passing every check in this review:

1. **DPR (Device Pixel Ratio) Control**: Cap `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` to prevent 3x/4x mobile GPU overload.
2. **Draw Calls Budget**: Minimize draw calls via geometry instancing, material sharing, or texture atlas techniques (target < 50 draw calls per frame).
3. **Polygon Count**: Enforce low-to-mid poly budgets suitable for web rendering; eliminate unnecessary geometry sub-divisions.
4. **Texture Resolution & Compression**: Use optimized WebP/KTX2/Basis textures capped at required display dimensions (max 2048×2048 for hero backgrounds, 1024×1024 for objects).
5. **Texture Format**: Ensure optimal texture formats with mipmapping enabled only where required.
6. **GPU Memory**: Track and verify total VRAM usage remains under strict mobile budgets (< 100 MB).
7. **Render Loop Control**: Pause `requestAnimationFrame` render loops when the canvas component is offscreen or hidden (`IntersectionObserver` + `document.hidden`).
8. **Post-Processing Overhead**: Limit post-processing passes (avoid stacking heavy bloom, depth-of-field, or motion blur passes).
9. **Lazy Initialization**: Defer 3D canvas initialization until user interaction or section scroll proximity.
10. **Object & Geometry Disposal**: Explicitly invoke `.dispose()` on geometries during unmount lifecycle.
11. **Material Disposal**: Explicitly invoke `.dispose()` on materials during unmount lifecycle.
12. **Texture Disposal**: Explicitly invoke `.dispose()` on all loaded textures during unmount lifecycle.
13. **Mobile Fallback**: Provide an automatic 2D static image or CSS fallback on low-power devices or small screens.
14. **Reduced Motion Compliance**: Immediately disable continuous 3D camera/mesh animation when `prefers-reduced-motion: reduce` is active.
15. **FPS Stability**: Verify locked 60 FPS performance without frame drops or memory leaks across extended interaction sessions.
