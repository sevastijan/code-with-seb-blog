'use client'
import Image from './Image'
import Link from './Link'
import { useRef } from 'react'
interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  badge?: string
}

const Card = ({ title, description, imgSrc, href, badge }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 6
    const rotateY = ((x - centerX) / centerX) * -6

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`

    glare.style.opacity = '1'
    glare.style.background = `radial-gradient(300px circle at ${x}px ${y}px, #13213fff, transparent 70%)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card || !glare) return
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
    glare.style.opacity = '0'
  }

  return (
    <div className="h-full [perspective:1000px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-full flex-col overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 bg-white pt-10 transition-transform duration-300 ease-out will-change-transform hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
      >
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300"
        />
        {badge && (
          <span className="absolute left-6 top-6 z-10 rounded bg-primary-500 px-2 py-1 text-xs font-medium text-white shadow-sm">
            {badge}
          </span>
        )}
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
          <div>
            <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
              {href ? (
                <Link href={href} aria-label={`Link to ${title}`}>
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <p className="prose mb-3 line-clamp-3 max-w-none text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
