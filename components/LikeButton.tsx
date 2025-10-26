'use client'

import { useEffect, useRef, useState } from 'react'
import { Flame } from 'lucide-react'
import confetti from 'canvas-confetti'

interface LikeButtonProps {
  slug: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let confettiInstance: ((opts?: any) => void) | null = null

export default function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (confettiInstance) return
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '999999',
    } as CSSStyleDeclaration)
    document.body.appendChild(canvas)

    confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: false,
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/likes/${slug}`)
        const data = await res.json()
        setLikes(data.likes || 0)
      } catch (err) {
        console.error(err)
      }
      if (localStorage.getItem(`liked:${slug}`) === '1') setLiked(true)
    })()
  }, [slug])

  const handleLike = async () => {
    if (liked || loading) return
    setLiked(true)
    setLikes((v) => v + 1)
    setLoading(true)

    try {
      await fetch(`/api/likes/${slug}`, { method: 'POST' })
      localStorage.setItem(`liked:${slug}`, '1')
      fireConfettiAtButton()
    } catch {
      setLiked(false)
      setLikes((v) => v - 1)
    } finally {
      setLoading(false)
    }
  }

  function fireConfettiAtButton() {
    const fire = confettiInstance ?? confetti
    const rect = btnRef.current?.getBoundingClientRect()
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.5 }

    fire({
      origin,
      particleCount: 35,
      spread: 70,
      startVelocity: 28,
      gravity: 0.9,
      scalar: 0.9,
      colors: ['#ef4444', '#fb7185', '#fca5a5'],
    })
  }

  return (
    <div className="sticky top-24 flex flex-col items-center">
      <div className="relative flex items-center">
        <button
          ref={btnRef}
          onClick={handleLike}
          disabled={loading || liked}
          aria-label="Like this post"
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-all
            ${
              liked
                ? 'animate-flame-glow bg-gradient-to-tr from-red-500 via-rose-500 to-pink-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-tr hover:from-red-500 hover:via-rose-500 hover:to-pink-500 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gradient-to-tr dark:hover:from-red-500 dark:hover:via-rose-500 dark:hover:to-pink-500'
            } active:scale-95`}
        >
          <Flame
            className={`h-6 w-6 ${liked ? 'animate-[like-pulse_300ms_ease-out] fill-white' : ''}`}
          />
        </button>
        <span className="ml-3 select-none text-base font-medium text-gray-700 dark:text-gray-300">
          {likes}
        </span>
      </div>
    </div>
  )
}
