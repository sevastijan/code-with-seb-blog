import { Redis } from '@upstash/redis'
import type { Comment } from '@/types/comment'
import crypto from 'crypto'

// Initialize Redis client
const redis = Redis.fromEnv()

// Generate unique comment ID
export function generateCommentId(): string {
  return `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`
}

// Verify Turnstile token
export async function verifyTurnstileToken(
  token: string,
  secretKey: string
): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

// Get comments for a slug
export async function getComments(slug: string): Promise<Comment[]> {
  try {
    // Get list of comment IDs for this slug
    const commentIds = await redis.lrange<string>(`comments:${slug}`, 0, -1)

    if (!commentIds || commentIds.length === 0) {
      return []
    }

    // Fetch all comments
    const comments = await Promise.all(
      commentIds.map(async (id) => {
        const comment = await redis.get<Comment>(`comment:${id}`)
        return comment
      })
    )

    // Filter out nulls and only return approved comments
    return comments
      .filter((c): c is Comment => c !== null && c.status === 'approved')
      .sort((a, b) => a.timestamp - b.timestamp) // Oldest first
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

// Add a new comment
export async function addComment(
  comment: Omit<Comment, 'id' | 'timestamp'>
): Promise<Comment> {
  const id = generateCommentId()
  const timestamp = Date.now()

  const newComment: Comment = {
    ...comment,
    id,
    timestamp,
    status: 'pending', // All comments start as pending for moderation
  }

  // Save comment
  await redis.set(`comment:${id}`, newComment)

  // Add to slug's comment list
  await redis.rpush(`comments:${newComment.slug}`, id)

  // Add to pending list for moderation
  await redis.rpush('comments:pending', id)

  return newComment
}

// Get all pending comments (for moderation)
export async function getPendingComments(): Promise<Comment[]> {
  try {
    const commentIds = await redis.lrange<string>('comments:pending', 0, -1)

    if (!commentIds || commentIds.length === 0) {
      return []
    }

    const comments = await Promise.all(
      commentIds.map(async (id) => {
        const comment = await redis.get<Comment>(`comment:${id}`)
        return comment
      })
    )

    return comments
      .filter((c): c is Comment => c !== null && c.status === 'pending')
      .sort((a, b) => b.timestamp - a.timestamp) // Newest first
  } catch (error) {
    console.error('Error fetching pending comments:', error)
    return []
  }
}

// Approve a comment
export async function approveComment(commentId: string): Promise<boolean> {
  try {
    const comment = await redis.get<Comment>(`comment:${commentId}`)

    if (!comment) {
      return false
    }

    // Update status
    comment.status = 'approved'
    await redis.set(`comment:${commentId}`, comment)

    // Remove from pending list
    await redis.lrem('comments:pending', 0, commentId)

    return true
  } catch (error) {
    console.error('Error approving comment:', error)
    return false
  }
}

// Mark comment as spam
export async function markAsSpam(commentId: string): Promise<boolean> {
  try {
    const comment = await redis.get<Comment>(`comment:${commentId}`)

    if (!comment) {
      return false
    }

    // Update status
    comment.status = 'spam'
    await redis.set(`comment:${commentId}`, comment)

    // Remove from pending list
    await redis.lrem('comments:pending', 0, commentId)

    // Add to spam list
    await redis.rpush('comments:spam', commentId)

    return true
  } catch (error) {
    console.error('Error marking comment as spam:', error)
    return false
  }
}

// Delete a comment
export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    const comment = await redis.get<Comment>(`comment:${commentId}`)

    if (!comment) {
      return false
    }

    // Remove from all lists
    await redis.lrem(`comments:${comment.slug}`, 0, commentId)
    await redis.lrem('comments:pending', 0, commentId)
    await redis.lrem('comments:spam', 0, commentId)

    // Delete the comment itself
    await redis.del(`comment:${commentId}`)

    return true
  } catch (error) {
    console.error('Error deleting comment:', error)
    return false
  }
}

// Get comment count for a slug
export async function getCommentCount(slug: string): Promise<number> {
  try {
    const comments = await getComments(slug)
    return comments.length
  } catch (error) {
    console.error('Error getting comment count:', error)
    return 0
  }
}

// Generate Gravatar URL
export function getGravatarUrl(email: string, size: number = 80): string {
  const hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex')
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`
}
