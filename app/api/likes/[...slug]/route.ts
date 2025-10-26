import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function GET(_: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params
  const key = slug.join('/')
  const likes = await redis.get<number>(`likes:${key}`)
  return NextResponse.json({ likes: likes || 0 })
}

export async function POST(_: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params
  const key = slug.join('/')
  const likes = await redis.incr(`likes:${key}`)
  return NextResponse.json({ likes })
}
