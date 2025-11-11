'use client'

import { useEffect, useState } from 'react'
import { Comment } from '@/types/comment'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { MessageSquare } from 'lucide-react'

interface CommentSectionProps {
  slug: string
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/comments/${slug}`)
      const data = await response.json()

      if (data.success) {
        setComments(data.comments || [])
      } else {
        setError('Failed to load comments')
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
      setError('An error occurred while loading comments')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [slug])

  return (
    <section className="mx-auto max-w-3xl space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessageSquare className="text-primary-600 dark:text-primary-400" size={28} />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Komentarze {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {/* Comment Form */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Dodaj komentarz
        </h3>
        <CommentForm slug={slug} onCommentSubmitted={fetchComments} />
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24">
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
              <span>Ładowanie komentarzy...</span>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-center text-red-800 dark:bg-red-900/20 dark:text-red-300">
            {error}
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
            <MessageSquare
              className="mx-auto mb-3 text-gray-400 dark:text-gray-500"
              size={48}
            />
            <p className="text-gray-600 dark:text-gray-400">
              Bądź pierwszy! Dodaj komentarz do tego artykułu.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
