'use client'

import { useEffect, useRef } from 'react'

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const docHeight =
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
        window.innerHeight
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      const pct = Math.min(Math.max(scrolled, 0), 100)

      if (barRef.current) {
        barRef.current.style.width = `${pct}%`
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-gray-200 dark:bg-gray-800">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-[width] duration-75 ease-linear will-change-[width]"
        style={{ width: '0%' }}
      />
    </div>
  )
}
