import { NextRequest, NextResponse } from 'next/server'
import {
  getPendingComments,
  approveComment,
  markAsSpam,
  deleteComment,
} from '@/lib/comments'

// Simple auth check - in production, use proper authentication
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const adminToken = process.env.ADMIN_TOKEN

  if (!adminToken) {
    console.warn('ADMIN_TOKEN not set - moderation API is disabled')
    return false
  }

  return authHeader === `Bearer ${adminToken}`
}

// GET /api/comments/moderate - Get all pending comments
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    )
  }

  try {
    const comments = await getPendingComments()

    return NextResponse.json({
      success: true,
      comments,
    })
  } catch (error) {
    console.error('Error in GET /api/comments/moderate:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch pending comments',
      },
      { status: 500 }
    )
  }
}

// POST /api/comments/moderate - Moderate a comment
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { commentId, action } = body

    if (!commentId || !action) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing commentId or action',
        },
        { status: 400 }
      )
    }

    let result = false
    let message = ''

    switch (action) {
      case 'approve':
        result = await approveComment(commentId)
        message = 'Comment approved'
        break

      case 'spam':
        result = await markAsSpam(commentId)
        message = 'Comment marked as spam'
        break

      case 'delete':
        result = await deleteComment(commentId)
        message = 'Comment deleted'
        break

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
          },
          { status: 400 }
        )
    }

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to perform action',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message,
    })
  } catch (error) {
    console.error('Error in POST /api/comments/moderate:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to moderate comment',
      },
      { status: 500 }
    )
  }
}
