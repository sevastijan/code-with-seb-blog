import React, { useRef, useState } from 'react'

/**
 * Inspira-style 3D Glow Card with your SVG logo
 * - Drop into any React/Next.js project with Tailwind CSS enabled
 * - Provides tilt/parallax, glassy gradient border, spotlight follow, and subtle grain
 * - Pure client-side, no external libs
 */
export default function LogoGlowCard({
  className = '',
  width = 360,
  height = 260,
  title = '',
}: {
  className?: string
  width?: number
  height?: number
  title?: string
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onPointerMove = (e: React.PointerEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    setPos({ x, y })

    // Subtle tilt (clamp ±8deg)
    const ry = (x - 0.5) * 16 // rotateY
    const rx = (0.5 - y) * 16 // rotateX
    setTilt({ rx, ry })
  }

  const onPointerLeave = () => {
    setPos({ x: 0.5, y: 0.5 })
    setTilt({ rx: 0, ry: 0 })
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Grain layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(white,transparent_80%)]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.08%27/></svg>')",
        }}
      />

      {/* Card */}
      <div
        ref={cardRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="group relative rounded-2xl p-[2px] transition-transform duration-300"
        style={{
          width,
          height,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          background:
            'linear-gradient(135deg, rgba(34,211,238,0.8), rgba(56,189,248,0.2) 40%, rgba(147,51,234,0.25))',
        }}
      >
        {/* Glow border via conic gradient */}
        <div
          className="absolute -inset-[2px] rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, rgba(56,189,248,0.35), rgba(147,51,234,0.25), rgba(56,189,248,0.35))',
          }}
        />

        {/* Inner panel */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-950/70 backdrop-blur-xl">
          {/* Moving spotlight */}
          <div
            className="pointer-events-none absolute -inset-20 opacity-60 transition-opacity duration-300 group-hover:opacity-90"
            style={{
              background: `radial-gradient(300px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(34,211,238,0.35), transparent 60%)`,
            }}
          />

          {/* Grid sheen */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                'linear-gradient(transparent 23px, rgba(255,255,255,0.06) 24px), linear-gradient(90deg, transparent 23px, rgba(255,255,255,0.06) 24px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            {/* SVG Logo (your input pasted inline for full control) */}
            <div className="relative">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="344.5639097744361 330.27819548872174 111.73684210526318 91.21804511278197"
                className="h-20 w-auto drop-shadow-[0_8px_24px_rgba(34,211,238,0.35)]"
                aria-hidden
              >
                <defs>
                  <path
                    d="M453.3 331.28L453.3 359.85L388.64 418.5L388.64 388.42L453.3 331.28Z"
                    id="aFZf6T5ED"
                  ></path>
                  <linearGradient
                    id="gradientb2ThqnP5Op"
                    gradientUnits="userSpaceOnUse"
                    x1="420.97"
                    y1="331.28"
                    x2="420.97"
                    y2="418.5"
                  >
                    <stop style={{ stopColor: '#06b6d4', stopOpacity: 1 }} offset="0%"></stop>
                    <stop style={{ stopColor: '#67e8f9', stopOpacity: 1 }} offset="100%"></stop>
                  </linearGradient>
                  <path
                    d="M410.23 331.28L410.23 359.85L345.56 418.5L345.56 388.42L410.23 331.28Z"
                    id="a9fehgwfM"
                  ></path>
                  <linearGradient
                    id="gradientk1wNV9Ostb"
                    gradientUnits="userSpaceOnUse"
                    x1="377.89"
                    y1="331.28"
                    x2="377.89"
                    y2="418.5"
                  >
                    <stop style={{ stopColor: '#06b6d4', stopOpacity: 1 }} offset="0%"></stop>
                    <stop style={{ stopColor: '#67e8f9', stopOpacity: 1 }} offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g>
                  <g>
                    <use xlinkHref="#aFZf6T5ED" opacity="1" fill="url(#gradientb2ThqnP5Op)"></use>
                  </g>
                  <g>
                    <use xlinkHref="#a9fehgwfM" opacity="1" fill="url(#gradientk1wNV9Ostb)"></use>
                  </g>
                </g>
              </svg>

              {/* Subtle ring */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-full opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(closest-side, rgba(34,211,238,0.25), transparent)',
                }}
              />
            </div>

            {title && <p className="select-none text-sm font-medium text-zinc-200/90">{title}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
