export interface Comment {
  id: string
  slug: string
  author: string
  email: string
  content: string
  timestamp: number
  status: 'approved' | 'pending' | 'spam'
  parentId?: string // For nested replies
  ip?: string
  userAgent?: string
}

export interface CommentFormData {
  author: string
  email: string
  content: string
  turnstileToken: string
  parentId?: string
}

export interface CommentApiResponse {
  success: boolean
  comment?: Comment
  comments?: Comment[]
  error?: string
}
