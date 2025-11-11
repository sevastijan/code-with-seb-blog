'use client'

import { Comment } from '@/types/comment'
import { getGravatarUrl } from '@/lib/comments'

interface CommentItemProps {
  comment: Comment
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  if (seconds < 60) return 'przed chwilą'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min temu`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} godz. temu`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} dni temu`
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} tyg. temu`
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} mies. temu`
  return `${Math.floor(seconds / 31536000)} lat temu`
}

export default function CommentItem({ comment }: CommentItemProps) {
  const gravatarUrl = getGravatarUrl(comment.email, 80)
  const timeAgo = getTimeAgo(comment.timestamp)

  return (
    <article className="group relative flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-700">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={gravatarUrl}
          alt={`${comment.author} avatar`}
          className="h-12 w-12 rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
          width={48}
          height={48}
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        {/* Header */}
        <div className="flex items-baseline gap-2">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{comment.author}</h4>
          <time
            className="text-sm text-gray-500 dark:text-gray-400"
            dateTime={new Date(comment.timestamp).toISOString()}
          >
            {timeAgo}
          </time>
        </div>

        {/* Comment text */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{comment.content}</p>
        </div>
      </div>
    </article>
  )
}
