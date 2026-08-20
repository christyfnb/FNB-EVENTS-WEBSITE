'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MediaSlot } from '@/components/fnb/media-slot'
import { getMedia } from '@/lib/media-registry'

const FALLBACK_ASSET = getMedia('capability-digital-dashboard')

/**
 * PHYSICAL DIGITAL CANVAS (`PhysicalDigitalCanvas`).
 * Encapsulates native Three.js 3D WebGL renderer for Section S07.
 *
 * Performance & Safety:
 * - Lazy initialized via IntersectionObserver (rootMargin 200px).
 * - Render loop pauses when offscreen or tab hidden (`document.hidden`).
 * - WebGL disabled on mobile (<1024px) & `prefers-reduced-motion: reduce`.
 * - Fallback asset `digital-dashboard.png` rendered on mobile/reduced-motion/WebGL failure.
 * - Canvas has pointer-events: none and aria-hidden="true".
 * - Explicit disposal of geometries, materials, and renderer on unmount.
 */
export function PhysicalDigitalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    // 1. Mobile (<1024px) & Reduced Motion checks: Do NOT initialize WebGL
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isMobile || isReducedMotion) {
      setUseFallback(true)
      return
    }

    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer | null = null
    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let animFrameId = 0
    let isIntersecting = false
    let isTabVisible = !document.hidden
    let pointerX = 0
    let pointerY = 0

    let wireframeMesh: THREE.LineSegments | null = null
    let nodePoints: THREE.Points | null = null
    let geometry: THREE.BufferGeometry | null = null
    let lineMaterial: THREE.LineBasicMaterial | null = null
    let pointsMaterial: THREE.PointsMaterial | null = null

    try {
      // 2. Initialize WebGL Renderer safely
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setClearColor(0x050505, 0)
      container.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100)
      camera.position.set(0, 0, 8)

      // 3. Create Architectural Wireframe Geometry (Truss Box Structure)
      const vertices: number[] = []
      const gridWidth = 4
      const gridHeight = 2.5
      const depth = 2.5

      // Front & Back rectangular frames
      vertices.push(
        -gridWidth, -gridHeight, depth,  gridWidth, -gridHeight, depth,
         gridWidth, -gridHeight, depth,  gridWidth,  gridHeight, depth,
         gridWidth,  gridHeight, depth, -gridWidth,  gridHeight, depth,
        -gridWidth,  gridHeight, depth, -gridWidth, -gridHeight, depth,

        -gridWidth, -gridHeight, -depth,  gridWidth, -gridHeight, -depth,
         gridWidth, -gridHeight, -depth,  gridWidth,  gridHeight, -depth,
         gridWidth,  gridHeight, -depth, -gridWidth,  gridHeight, -depth,
        -gridWidth,  gridHeight, -depth, -gridWidth, -gridHeight, -depth,

        // Connecting struts
        -gridWidth, -gridHeight, depth, -gridWidth, -gridHeight, -depth,
         gridWidth, -gridHeight, depth,  gridWidth, -gridHeight, -depth,
         gridWidth,  gridHeight, depth,  gridWidth,  gridHeight, -depth,
        -gridWidth,  gridHeight, depth, -gridWidth,  gridHeight, -depth,

        // Diagonal truss braces
        -gridWidth, -gridHeight, depth,  gridWidth,  gridHeight, depth,
        -gridWidth,  gridHeight, depth,  gridWidth, -gridHeight, depth,
        -gridWidth, -gridHeight, -depth, gridWidth,  gridHeight, -depth
      )

      geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

      lineMaterial = new THREE.LineBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.65,
      })

      wireframeMesh = new THREE.LineSegments(geometry, lineMaterial)
      scene.add(wireframeMesh)

      // 4. Create Glowing Molten Orange Digital Signal Nodes
      const nodePositions = [
        -gridWidth, -gridHeight, depth,
         gridWidth, -gridHeight, depth,
         gridWidth,  gridHeight, depth,
        -gridWidth,  gridHeight, depth,
         0,          0,          0,
        -gridWidth / 2, gridHeight / 2, depth / 2,
         gridWidth / 2, -gridHeight / 2, -depth / 2,
      ]

      const nodeGeometry = new THREE.BufferGeometry()
      nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3))

      pointsMaterial = new THREE.PointsMaterial({
        color: 0xff4500, // Molten Orange Signal
        size: 0.22,
        transparent: true,
        opacity: 0.9,
      })

      nodePoints = new THREE.Points(nodeGeometry, pointsMaterial)
      scene.add(nodePoints)

      // 5. Render Loop with Offscreen / Hidden Suspension
      let clockTime = 0
      const render = () => {
        if (!isIntersecting || !isTabVisible || !renderer || !scene || !camera) return

        clockTime += 0.015
        if (wireframeMesh) wireframeMesh.rotation.y = Math.sin(clockTime * 0.5) * 0.15
        if (nodePoints) nodePoints.rotation.y = Math.sin(clockTime * 0.5) * 0.15

        // Subtle pointer parallax (max 0.15 rad)
        camera.position.x = pointerX * 0.5
        camera.position.y = -pointerY * 0.3
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
        animFrameId = requestAnimationFrame(render)
      }

      const startLoop = () => {
        cancelAnimationFrame(animFrameId)
        if (isIntersecting && isTabVisible) {
          animFrameId = requestAnimationFrame(render)
        }
      }

      // 6. IntersectionObserver (Lazy Init & Offscreen Suspension)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersecting = entry.isIntersecting
            if (isIntersecting) startLoop()
            else cancelAnimationFrame(animFrameId)
          })
        },
        { rootMargin: '200px' }
      )
      observer.observe(container)

      // 7. Tab Visibility Suspension
      const handleVisibilityChange = () => {
        isTabVisible = !document.hidden
        if (isTabVisible) startLoop()
        else cancelAnimationFrame(animFrameId)
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)

      // 8. Pointer Parallax (Subtle camera tracking)
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1
      }
      window.addEventListener('mousemove', handleMouseMove, { passive: true })

      // 9. ResizeObserver Lifecycle
      const resizeObserver = new ResizeObserver(() => {
        if (!container || !renderer || !camera) return
        const w = container.clientWidth
        const h = container.clientHeight
        if (w === 0 || h === 0) return
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      })
      resizeObserver.observe(container)

      // 10. WebGL Context Loss Handler
      const canvasEl = renderer.domElement
      const handleContextLost = (e: Event) => {
        e.preventDefault()
        cancelAnimationFrame(animFrameId)
        setUseFallback(true)
      }
      canvasEl.addEventListener('webglcontextlost', handleContextLost)

      // 11. Complete Unmount Disposal Cleanup
      return () => {
        cancelAnimationFrame(animFrameId)
        observer.disconnect()
        resizeObserver.disconnect()
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('mousemove', handleMouseMove)
        canvasEl.removeEventListener('webglcontextlost', handleContextLost)

        if (geometry) geometry.dispose()
        if (nodeGeometry) nodeGeometry.dispose()
        if (lineMaterial) lineMaterial.dispose()
        if (pointsMaterial) pointsMaterial.dispose()

        if (renderer) {
          renderer.dispose()
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement)
          }
        }
      }
    } catch {
      setUseFallback(true)
    }
  }, [])

  if (useFallback) {
    return (
      <div className="relative aspect-[16/10] w-full max-w-xl overflow-hidden border border-steel/40">
        <MediaSlot
          asset={FALLBACK_ASSET}
          className="h-full w-full object-cover"
          sizes="(max-width: 1023px) 92vw, 45vw"
          decorative
        />
        <div className="absolute bottom-3 left-3 bg-obsidian/90 px-3 py-1 text-[10px] font-mono text-signal border border-steel/40">
          CONCEPTUAL CAPABILITY VISUALIZATION
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative aspect-[16/10] w-full max-w-xl overflow-hidden border border-steel/40 bg-obsidian pointer-events-none"
    />
  )
}
