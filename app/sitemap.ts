import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

const POSTS_PER_PAGE = 5

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const currentDate = new Date().toISOString().split('T')[0]

  // Statyczne strony
  const staticRoutes = ['', 'blog', 'tags', 'about', 'consulting', 'services'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: currentDate,
  }))

  // Wpisy blogowe
  const publishedPosts = allBlogs.filter((post) => !post.draft)
  const blogRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }))

  // Paginacja bloga
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE)
  const paginationRoutes = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => page > 1) // Strona 1 to /blog
    .map((page) => ({
      url: `${siteUrl}/blog/page/${page}`,
      lastModified: currentDate,
    }))

  // Strony tagów - wyciągnięte z postów blogowych
  const allTags = new Set<string>()
  publishedPosts.forEach((post) => {
    post.tags?.forEach((tag) => allTags.add(tag))
  })
  const tagRoutes = Array.from(allTags).map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: currentDate,
  }))

  return [...staticRoutes, ...blogRoutes, ...paginationRoutes, ...tagRoutes]
}
