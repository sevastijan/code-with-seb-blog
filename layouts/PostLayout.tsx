import { ReactNode, useMemo } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Card from '@/components/Card'
import TableOfContents from '@/components/TableOfContents'
import ReadingProgress from '@/components/ReadingProgress'
import LikeButton from '@/components/LikeButton'
import CommentSection from '@/components/CommentSection'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface TocItem {
  value: string
  url: string
  depth: number
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  toc?: TocItem[]
  children: ReactNode
  readingTime?: number
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  toc = [],
  readingTime,
}: LayoutProps) {
  const { path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  const suggestedPosts = useMemo(() => {
    if (!tags || tags.length === 0) return []
    const related = allBlogs
      .filter((post) => post.slug !== slug)
      .map((post) => {
        const overlap = post.tags?.filter((t) => tags.includes(t)) ?? []
        return { ...post, score: overlap.length }
      })
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
    if (related.length >= 2) return related.slice(0, 2).map((p) => ({ ...p, label: 'Related' }))
    const remainingNeeded = 2 - related.length
    const pool = allBlogs.filter((p) => p.slug !== slug && !related.some((r) => r.slug === p.slug))
    const randomExtra = pool
      .sort(() => Math.random() - 0.5)
      .slice(0, remainingNeeded)
      .map((p) => ({ ...p, label: 'Discover more' }))
    return [...related.map((p) => ({ ...p, label: 'Related' })), ...randomExtra]
  }, [slug, tags])

  return (
    <SectionContainer>
      <ReadingProgress />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="mb-8 space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Intl.DateTimeFormat('en-US', postDateTemplate).format(new Date(date))}
                    </time>
                    <span className="pl-2">⏳ {readingTime} min read</span>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>

          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <aside className="flex flex-col gap-8 pb-12 ">
              {/* Author */}
              <dl className="py-8 xl:border-b xl:border-t xl:border-gray-200 xl:dark:border-gray-700">
                <dt className="sr-only">Author</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>

              {/* Tags */}
              {tags && (
                <div className="">
                  <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}

              {(next || prev) && (
                <div className="hidden flex-col gap-6 pb-8 pt-8 xl:flex xl:border-b xl:border-t xl:border-gray-200 xl:dark:border-gray-700">
                  {prev?.path && (
                    <div>
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${prev.path}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next?.path && (
                    <div className="hidden md:block">
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Next Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${next.path}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="sticky top-24 hidden self-start xl:block">
                <LikeButton slug={slug} />
              </div>

              <div className="fixed bottom-6 right-[6rem] z-50 xl:hidden">
                <LikeButton slug={slug} />
              </div>
            </aside>

            <div className=" divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:pb-0">
              {content.summary && (
                <p className="mx-auto mb-4 max-w-3xl text-gray-600 dark:text-gray-400">
                  {content.summary}
                </p>
              )}

              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert xl:pt-0">
                {toc.length > 0 && <TableOfContents toc={toc} />}
                {children}
              </div>

              {suggestedPosts.length > 0 && (
                <div className="mt-12 border-t border-gray-200 pb-6 pt-8 dark:border-gray-700">
                  <h2 className="mb-8 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                    Suggested posts
                  </h2>
                  <div className="grid items-stretch gap-6 sm:grid-cols-2">
                    {suggestedPosts.map((post) => (
                      <Card
                        key={post.slug}
                        title={post.title}
                        description={post.summary || ''}
                        imgSrc={post.images?.[0] || null}
                        href={`/${post.path}`}
                        badge={post.label}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Comment Section */}
              <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                <CommentSection slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
