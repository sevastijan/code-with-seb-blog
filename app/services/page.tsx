import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Interview Services' })

export default function ServicesPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Hero Section */}
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Hire top developers in 7 days — without endless CVs or HR overhead
          </h1>
          <p className="mt-4 text-lg leading-7 text-gray-500 dark:text-gray-400">
            Technical recruitment run by engineers — not recruiters.
            <br />
            Fast process, top-tier candidates, transparent collaboration.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary-500 px-6 py-3 text-base font-medium text-white hover:bg-primary-600 dark:hover:bg-primary-400"
            >
              Book a 15-min Call
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            92% of clients hire from the first shortlist
          </p>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Why Work With Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-3 text-3xl">⚡</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Faster time-to-hire
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Candidates delivered in 7 days
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-3 text-3xl">🧑‍💻</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Technical screening
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vetted by senior engineers
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-3 text-3xl">🪜</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Only shortlisted talent
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No random CV dumps
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-3 text-3xl">🌍</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                European talent pool
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access to developers across Europe
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-3 text-3xl">💬</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Flexible models
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Success fee, body leasing, matchmaking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Models */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Our Services
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 text-3xl">💼</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                Success Fee
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Pay only when you hire.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Perfect for: Startups, software houses
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 text-3xl">🔁</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                Body Leasing
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                We provide developers who work directly with your team — you pay a monthly rate, we
                handle the rest.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Perfect for: Scale-ups, enterprise teams
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 text-3xl">⚡</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                Matchmaking
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                One-off, fast matching of top talent to your project.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Perfect for: Fast needs, short-term projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                1
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Discovery Call
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A quick chat to define your needs & stack.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Sourcing & Screening
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Active search + technical vetting.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                3
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Shortlist
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  2–3 qualified developers, ready to interview.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                4
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Decision & Start
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Onboard your ideal candidate fast.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-lg font-semibold text-primary-500 dark:text-primary-400">
            Average time from brief to shortlist: 7 days
          </p>
        </div>
      </div>

      {/* Tech Stacks */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Tech Stacks We Cover
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Node.js',
              'Nest.js',
              'Python',
              'Go',
              'Java',
              'React Native',
              'Flutter',
              'DevOps / Cloud',
              'AI / ML (select projects)',
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Looking for something else?{' '}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Let's talk.
            </a>
          </p>
        </div>
      </div>

      {/* Why Companies Choose Us */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Why Companies Choose Us
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">✅</span>
              <p className="text-gray-700 dark:text-gray-300">
                Recruitment led by senior engineers
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">⏳</span>
              <p className="text-gray-700 dark:text-gray-300">Shorter hiring cycles</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🧠</span>
              <p className="text-gray-700 dark:text-gray-300">
                Candidates vetted technically and culturally
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🧾</span>
              <p className="text-gray-700 dark:text-gray-300">
                Transparent pricing, no hidden fees
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🚀</span>
              <p className="text-gray-700 dark:text-gray-300">European talent pool</p>
            </div>
          </div>
          <p className="mt-8 text-center text-xl font-semibold italic text-gray-900 dark:text-gray-100">
            "We don't send CVs — we deliver solutions."
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary-500 px-6 py-3 text-base font-medium text-white hover:bg-primary-600 dark:hover:bg-primary-400"
            >
              Book a 15-min Call
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
