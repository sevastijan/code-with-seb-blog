import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects showcasing AI automation and web development.',
};

const projects = [
  {
    id: '01',
    title: 'AI Customer Support System',
    client: 'SaaS Startup',
    year: '2025',
    category: 'AI Automation',
    description: 'Built an intelligent support system that handles 70% of customer inquiries automatically, reducing response time from hours to seconds.',
    tags: ['OpenAI', 'LangChain', 'Next.js', 'PostgreSQL'],
    metrics: ['70% automation rate', '< 2s response time', '95% satisfaction'],
  },
  {
    id: '02',
    title: 'E-commerce Platform Rebuild',
    client: 'Fashion Brand',
    year: '2025',
    category: 'Web Development',
    description: 'Complete rebuild of a legacy e-commerce platform. Improved performance by 3x and conversion rate by 40%.',
    tags: ['Next.js', 'Shopify', 'TypeScript', 'Tailwind'],
    metrics: ['3x faster', '+40% conversion', '99.9% uptime'],
  },
  {
    id: '03',
    title: 'Intelligent Data Pipeline',
    client: 'Fintech Company',
    year: '2024',
    category: 'AI Automation',
    description: 'Automated data processing pipeline with ML-powered anomaly detection, handling 1M+ transactions daily.',
    tags: ['Python', 'AWS', 'Machine Learning', 'PostgreSQL'],
    metrics: ['1M+ daily transactions', '99.7% accuracy', '10x cost reduction'],
  },
  {
    id: '04',
    title: 'Analytics Dashboard',
    client: 'B2B SaaS',
    year: '2024',
    category: 'Web Development',
    description: 'Real-time analytics dashboard with complex data visualizations and customizable reports.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSocket'],
    metrics: ['500+ daily users', '< 100ms updates', '25 chart types'],
  },
];

export default function WorkPage() {
  return (
    <div className="grain">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[200px] opacity-10" />

        <div className="container relative z-10">
          <span className="label mb-6 block">Work</span>
          <h1 className="text-headline mb-8">
            <span className="block">Projects that</span>
            <span className="block text-accent">delivered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--c-text-muted)] leading-relaxed max-w-2xl">
            A curated selection of projects showcasing my approach to building products that deliver real results.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24 md:pb-40">
        <div className="container">
          <div className="space-y-24">
            {projects.map((project) => (
              <article key={project.id} className="group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Left: Number & Meta */}
                  <div className="lg:col-span-4">
                    <span className="text-[8rem] md:text-[12rem] font-black leading-none text-white/[0.02] group-hover:text-[var(--c-accent)]/10 transition-colors duration-500 block">
                      {project.id}
                    </span>
                    <div className="space-y-4 -mt-8">
                      <div>
                        <span className="label">Client</span>
                        <p className="text-lg font-medium">{project.client}</p>
                      </div>
                      <div>
                        <span className="label">Year</span>
                        <p className="text-lg font-medium">{project.year}</p>
                      </div>
                      <div>
                        <span className="label">Category</span>
                        <p className="text-[var(--c-accent)] font-medium">{project.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-8">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6 group-hover:text-[var(--c-accent)] transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-xl text-[var(--c-text-muted)] leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="px-5 py-3 bg-[var(--c-accent)]/10 border border-[var(--c-accent)]/20 text-[var(--c-accent)] font-medium"
                        >
                          {metric}
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 border border-[var(--c-border)] text-[var(--c-text-muted)] text-sm font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="divider mt-24" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="footer-cta">
        <div className="container relative z-10">
          <span className="label mb-6 block">Your project next?</span>
          <h2 className="text-headline mb-12">
            Let's <span className="text-accent">create.</span>
          </h2>
          <Link href="/contact" className="btn-magnetic">
            <span>Start a conversation</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
