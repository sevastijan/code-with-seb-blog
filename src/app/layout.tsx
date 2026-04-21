import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  Fira_Code,
  Playfair_Display,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const firaCode = Fira_Code({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-symbol",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = "https://codewithseb.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Code With Seb — Senior Software Developer & AI Specialist",
    template: "%s | Code With Seb",
  },
  description:
    "Senior software developer & AI specialist. I help startups and scale-ups ship faster with AI-powered development, custom agents, and hands-on engineering.",
  keywords: [
    "senior software developer",
    "AI automation",
    "AI agents",
    "web development",
    "Next.js",
    "React",
    "TypeScript",
    "technical consulting",
    "AI strategy",
    "MVP development",
  ],
  authors: [{ name: "Sebastian Sleczka", url: siteUrl }],
  creator: "Sebastian Sleczka",
  publisher: "Code With Seb",
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
    apple: { url: "/icon.svg", type: "image/svg+xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Code With Seb",
    title: "Code With Seb — Senior Software Developer & AI Specialist",
    description:
      "I help startups and scale-ups ship faster with AI-powered development, custom agents, and hands-on engineering.",
    images: [
      {
        url: `/og?title=${encodeURIComponent("Code With Seb — Senior Software Developer & AI Specialist")}`,
        width: 1200,
        height: 630,
        alt: "Code With Seb",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code With Seb — Senior Software Developer & AI Specialist",
    description:
      "I help startups and scale-ups ship faster with AI-powered development, custom agents, and hands-on engineering.",
    images: [`/og?title=${encodeURIComponent("Code With Seb — Senior Software Developer & AI Specialist")}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sebastian Sleczka",
  url: siteUrl,
  jobTitle: "Senior Software Developer & AI Specialist",
  description:
    "Senior software developer and AI specialist helping startups ship faster with AI-powered development and hands-on engineering.",
  sameAs: [
    "https://github.com/sevastijan",
    "https://www.linkedin.com/in/sebastiansleczka/",
    "https://www.youtube.com/@CodeWithSeb",
    "https://www.instagram.com/codewithseb/",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI Agents",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Software Architecture",
    "Code Review",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Code With Seb",
  url: siteUrl,
  description:
    "Senior software developer & AI specialist. Blog about AI, web development, and building products.",
  author: { "@type": "Person", name: "Sebastian Sleczka" },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Code With Seb",
  url: siteUrl,
  description:
    "AI automation, web development, and technical consulting for startups and scale-ups.",
  founder: { "@type": "Person", name: "Sebastian Sleczka" },
  areaServed: "Worldwide",
  serviceType: [
    "AI Automation",
    "AI Agent Development",
    "Web Application Development",
    "Technical Consulting",
    "Architecture Review",
  ],
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PL",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema, businessSchema]),
          }}
        />
      </head>
      <body className="font-sans bg-bg text-text-primary">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
