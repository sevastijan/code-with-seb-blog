'use client'

import { useEffect, useState } from 'react'

export function useLikedPosts(slugs: string[]) {
  const [liked, setLiked] = useState<Set<string>>(new Set())

  useEffect(() => {
    const likedSet = new Set<string>()
    for (const slug of slugs) {
      if (localStorage.getItem(`liked:${slug}`) === '1') {
        likedSet.add(slug)
      }
    }
    setLiked(likedSet)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return liked
}
