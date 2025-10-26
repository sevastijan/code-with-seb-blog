'use client'

interface TocItem {
  value: string
  url: string
  depth: number
}

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  return (
    <nav className="mx-auto mb-8 max-w-3xl p-6 pb-8 text-left dark:bg-gray-900 md:p-12">
      <h2 className="mb-8 mt-0 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
        Table of contents
      </h2>
      <ol className="m-0 list-none p-0">
        {toc.map((item, idx) => {
          const indent = item.depth * 16
          return (
            <p
              key={`${item.url}-${idx}`}
              className="my-1 ml-[-16px] p-0 text-gray-700 transition hover:text-primary-600 dark:text-gray-400"
              style={{
                paddingLeft: `${indent}px`,
              }}
            >
              <a
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.querySelector(item.url) as HTMLElement | null
                  if (!el) return
                  const y = el.getBoundingClientRect().top + window.scrollY - 70
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }}
                className="inline-block cursor-pointer"
              >
                {item.value}
              </a>
            </p>
          )
        })}
      </ol>
    </nav>
  )
}
