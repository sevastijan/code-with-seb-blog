'use client'

import { useEffect, useState } from 'react'
import { Comment } from '@/types/comment'
import { getGravatarUrl } from '@/lib/comments'
import { CheckCircle, XCircle, Trash2, RefreshCw, AlertCircle } from 'lucide-react'

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'przed chwilą'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min temu`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} godz. temu`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} dni temu`
  return new Date(timestamp).toLocaleDateString('pl-PL')
}

export default function CommentModerationPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adminToken, setAdminToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setAdminToken(savedToken)
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchPendingComments()
    }
  }, [isAuthenticated])

  const fetchPendingComments = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/comments/moderate', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setComments(data.comments || [])
      } else {
        setError(data.error || 'Failed to fetch comments')
        if (response.status === 401) {
          setIsAuthenticated(false)
          localStorage.removeItem('admin_token')
        }
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
      setError('An error occurred while fetching comments')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAction = async (commentId: string, action: 'approve' | 'spam' | 'delete') => {
    try {
      setActionLoading(commentId)

      const response = await fetch('/api/comments/moderate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ commentId, action }),
      })

      const data = await response.json()

      if (data.success) {
        // Remove comment from list
        setComments((prev) => prev.filter((c) => c.id !== commentId))
      } else {
        alert(data.error || 'Failed to perform action')
      }
    } catch (err) {
      console.error('Error performing action:', err)
      alert('An error occurred')
    } finally {
      setActionLoading(null)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('admin_token', adminToken)
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              Comment Moderation
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter admin token to continue
            </p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="token" className="sr-only">
                Admin Token
              </label>
              <input
                id="token"
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                required
                className="block w-full rounded-md border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Admin token"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary-600 px-4 py-3 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Comment Moderation
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {comments.length} pending comment{comments.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={fetchPendingComments}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Content */}
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
              <span>Loading comments...</span>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
            <AlertCircle className="mx-auto mb-2 text-red-600 dark:text-red-400" size={24} />
            <p className="text-red-800 dark:text-red-300">{error}</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
            <CheckCircle className="mx-auto mb-3 text-green-500" size={48} />
            <p className="text-gray-600 dark:text-gray-400">
              All caught up! No pending comments.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <img
                    src={getGravatarUrl(comment.email, 60)}
                    alt={`${comment.author} avatar`}
                    className="h-12 w-12 flex-shrink-0 rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
                    width={48}
                    height={48}
                  />

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {comment.author}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.email}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {getTimeAgo(comment.timestamp)}
                      </span>
                    </div>

                    {/* Post slug */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Post: <code className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-700">{comment.slug}</code>
                    </p>

                    {/* Comment */}
                    <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
                      <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(comment.id, 'approve')}
                        disabled={actionLoading === comment.id}
                        className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(comment.id, 'spam')}
                        disabled={actionLoading === comment.id}
                        className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                      >
                        <XCircle size={16} />
                        Spam
                      </button>
                      <button
                        onClick={() => handleAction(comment.id, 'delete')}
                        disabled={actionLoading === comment.id}
                        className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
