import { NextRequest, NextResponse } from 'next/server'
import { getComments, addComment, verifyTurnstileToken } from '@/lib/comments'
import type { Comment, CommentFormData } from '@/types/comment'

// GET /api/comments/[slug] - Get all approved comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const comments = await getComments(slug)

    return NextResponse.json({
      success: true,
      comments,
    })
  } catch (error) {
    console.error('Error in GET /api/comments:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch comments',
      },
      { status: 500 }
    )
  }
}

// POST /api/comments/[slug] - Add a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body: CommentFormData = await request.json()

    // Validate required fields
    if (!body.author || !body.email || !body.content || !body.turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
        },
        { status: 400 }
      )
    }

    // Validate content length
    if (body.content.length < 3 || body.content.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Comment must be between 3 and 5000 characters',
        },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (!turnstileSecret) {
      console.error('TURNSTILE_SECRET_KEY not configured')
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error',
        },
        { status: 500 }
      )
    }

    const isValidToken = await verifyTurnstileToken(body.turnstileToken, turnstileSecret)
    if (!isValidToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to verify anti-bot challenge',
        },
        { status: 403 }
      )
    }

    // Get client IP and user agent for spam detection
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
    const userAgent = request.headers.get('user-agent') || ''

    // Create comment
    const commentData: Omit<Comment, 'id' | 'timestamp'> = {
      slug,
      author: body.author.trim(),
      email: body.email.toLowerCase().trim(),
      content: body.content.trim(),
      status: 'pending',
      parentId: body.parentId,
      ip,
      userAgent,
    }

    const comment = await addComment(commentData)

    return NextResponse.json(
      {
        success: true,
        comment,
        message: 'Comment submitted successfully. It will be visible after moderation.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/comments:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit comment',
      },
      { status: 500 }
    )
  }
}
