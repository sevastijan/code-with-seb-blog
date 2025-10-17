import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Consulting' })

export default function ConsultingPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Hero Section */}
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Strategic Tech & Hiring Consulting
          </h1>
          <p className="mt-4 text-lg leading-7 text-gray-500 dark:text-gray-400">
            Make smarter product and hiring decisions — guided by senior engineers.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="https://calendly.com/codewithseb/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary-500 px-8 py-3 text-base font-medium text-white hover:bg-primary-600 dark:hover:bg-primary-400"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>
      </div>

      {/* Why Consulting Matters */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Why Consulting Matters
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <span className="mt-1 text-2xl">🎯</span>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Strategic clarity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">What to build and how</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <span className="mt-1 text-2xl">👥</span>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Right people at the right time
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Build your team strategically</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <span className="mt-1 text-2xl">🏗️</span>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Scalable architecture
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Build for growth from day one</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <span className="mt-1 text-2xl">💰</span>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Save time and money
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Avoid costly mistakes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consulting Packages */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Consulting Packages
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                Hiring Strategy Session
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                60-minute deep dive into your hiring needs, team gaps, and strategic roadmap.
              </p>
              <p className="text-sm font-medium text-primary-500 dark:text-primary-400">60 min</p>
            </div>
            <div className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                MVP Architecture Review
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Technical scalability audit and recommendations for your product architecture.
              </p>
              <p className="text-sm font-medium text-primary-500 dark:text-primary-400">
                Tech scalability
              </p>
            </div>
            <div className="rounded-lg border-2 border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                Scale-Up Sprint
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Comprehensive review of team structure, delivery process, and product roadmap.
              </p>
              <p className="text-sm font-medium text-primary-500 dark:text-primary-400">
                Team, delivery, roadmap
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Problems We Solve */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Common Problems We Solve
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-5 dark:bg-gray-800">
              <span className="text-2xl">❌</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Wrong hires and burned budget
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Costly hiring mistakes that drain resources and slow progress
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-5 dark:bg-gray-800">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Poor architecture and scaling issues
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Technical debt that prevents growth and increases costs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-5 dark:bg-gray-800">
              <span className="text-2xl">🐌</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Slow delivery
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Inefficient processes and unclear priorities delaying time-to-market
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-5 dark:bg-gray-800">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Tech debt blocking growth
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Legacy systems and shortcuts preventing innovation and scaling
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Approach */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Our Approach
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                1
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Audit & Discovery
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Deep dive into your current tech stack, team structure, and business goals to
                  identify gaps and opportunities.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                2
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Strategic Roadmap
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Clear, actionable plan with priorities, timelines, and resource requirements
                  tailored to your business.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                3
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Hands-on Sessions
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Working sessions with your team to align on strategy, review architecture, and
                  validate decisions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                4
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Optional Execution
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We can help you implement the strategy — from hiring the right people to building
                  the solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Models */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Engagement Models
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 text-3xl">⚡</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                One-time Session
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                60–90 minute focused strategy session for immediate clarity and actionable next
                steps.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 text-3xl">🚀</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                Short Sprint
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                2–4 week intensive engagement to solve specific challenges or launch an initiative.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 text-3xl">🤝</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                Monthly Advisory Retainer
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ongoing strategic guidance and support as your trusted tech advisor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Why Work With Me?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="mt-1 text-xl">✅</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Led by senior engineers
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-world expertise from engineers who have built and scaled products
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-xl">📈</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Clear ROI and execution speed
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practical solutions that deliver measurable results quickly
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-xl">🏆</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Trusted by startups & agencies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Proven track record helping companies scale successfully
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-xl">⚙️</span>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  From strategy to execution
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We don't just advise — we can help you implement and deliver
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Ready to scale smarter?
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            Book a strategy call and get a clear tech & hiring roadmap.
          </p>

          {/* Contact Info */}
          <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="mailto:ss3303708@gmail.com"
              className="flex items-center gap-2 text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <span>📧</span>
              <span>me@sevastijan.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sebastiansleczka/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <span>💼</span>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://calendly.com/codewithseb/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <span>📅</span>
              <span>Calendly</span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a
              href="https://calendly.com/codewithseb/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary-500 px-8 py-3 text-base font-medium text-white hover:bg-primary-600 dark:hover:bg-primary-400"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
