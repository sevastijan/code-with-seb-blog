'use client'

import { useState, useRef, useEffect } from 'react'
import Turnstile from './Turnstile'
import { Send } from 'lucide-react'

interface CommentFormProps {
  slug: string
  onCommentSubmitted: () => void
}

export default function CommentForm({ slug, onCommentSubmitted }: CommentFormProps) {
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  // Load saved author/email from localStorage
  useEffect(() => {
    const savedAuthor = localStorage.getItem('comment_author')
    const savedEmail = localStorage.getItem('comment_email')
    if (savedAuthor) setAuthor(savedAuthor)
    if (savedEmail) setEmail(savedEmail)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!turnstileToken) {
      setMessage({ type: 'error', text: 'Please complete the anti-bot verification' })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/comments/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author,
          email,
          content,
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({
          type: 'success',
          text: data.message || 'Komentarz wysłany! Zostanie opublikowany po moderacji.',
        })

        // Save author/email to localStorage
        localStorage.setItem('comment_author', author)
        localStorage.setItem('comment_email', email)

        // Clear form
        setContent('')
        setTurnstileToken('')

        // Notify parent
        onCommentSubmitted()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to submit comment' })
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name and Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Imię *
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            maxLength={100}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary-400"
            placeholder="Jan Kowalski"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email * <span className="text-xs text-gray-500">(nie będzie publiczny)</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary-400"
            placeholder="jan@example.com"
          />
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Komentarz *
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={3}
          maxLength={5000}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary-400"
          placeholder="Podziel się swoimi przemyśleniami..."
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {content.length} / 5000 znaków
        </p>
      </div>

      {/* Turnstile */}
      {turnstileSiteKey && (
        <div className="flex justify-center">
          <Turnstile
            siteKey={turnstileSiteKey}
            onVerify={setTurnstileToken}
            onExpire={() => setTurnstileToken('')}
            theme="auto"
          />
        </div>
      )}

      {/* Message */}
      {message && (
        <div
          className={`rounded-md p-3 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        {isSubmitting ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Wysyłanie...
          </>
        ) : (
          <>
            <Send size={16} />
            Wyślij komentarz
          </>
        )}
      </button>
    </form>
  )
}
