'use client';

import { useRef, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Mail, MapPin, Clock, Github, Linkedin, Youtube, Instagram, ChevronDown } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const faqs = [
  {
    q: 'What kind of projects do you take on?',
    a: 'AI automation, web development (Next.js/React), and technical consulting. I focus on projects where I can make a significant impact — not just write code, but drive real business outcomes.',
  },
  {
    q: 'What are your rates?',
    a: "It depends on the scope and complexity. I work on both fixed-price projects and retainer arrangements. Every project is different — let's have a conversation and figure out what works.",
  },
  {
    q: 'How quickly can you start?',
    a: 'Typically within 1-2 weeks. I maintain limited availability to ensure quality for existing clients. The sooner you reach out, the sooner we can lock in a start date.',
  },
  {
    q: 'Do you work with international clients?',
    a: "Absolutely. I'm based in Poland (CET) but work with clients globally. I have flexible hours for calls across time zones and async-first communication is my default.",
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'It starts with a discovery call to understand your challenge. Then I propose a scope, timeline, and approach. Once aligned, I move fast — you see progress daily, not monthly.',
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@codewithseb.com',
    href: 'mailto:hello@codewithseb.com',
    color: '#ff3d00',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Poland, EU',
    sub: 'Working with clients globally',
    color: '#00ff88',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    sub: 'Usually much faster',
    color: '#8b5cf6',
  },
];

const socials = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/sevastijan' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@CodeWithSeb' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sebastiansleczka/' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/codewithseb/' },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    let rafId = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <div className="grain">
      <CustomCursor />
      <ScrollProgress />

      {/* HERO - Full Viewport with 3D Typography */}
      <section ref={heroRef} className="cnt-hero">
        {/* Animated grid background */}
        <div className="cnt-hero-grid" />

        {/* Floating orbs */}
        <div className="cnt-hero-orb cnt-hero-orb-1" />
        <div className="cnt-hero-orb cnt-hero-orb-2" />

        {/* Giant "@" in background */}
        <div
          className="cnt-hero-giant"
          style={{
            transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
          }}
        >
          <span className="cnt-hero-giant-text">@</span>
        </div>

        {/* Main content */}
        <div className="container relative z-10">
          <div className="cnt-hero-content">
            {/* Label */}
            <div className="cnt-hero-label">
              <span className="cnt-hero-label-dot" />
              <span>Contact</span>
            </div>

            {/* Mega headline with 3D effect */}
            <h1 className="cnt-hero-title">
              <span
                className="cnt-hero-title-line cnt-hero-title-line-1"
                style={{
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
                }}
              >
                Let&apos;s
              </span>
              <span
                className="cnt-hero-title-line cnt-hero-title-line-2"
                style={{
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * -3}deg)`,
                }}
              >
                <span className="text-gradient-animated">Talk.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="cnt-hero-subtitle">
              Have a project in mind? Tell me about it.
              <br />
              <span className="text-[var(--c-text-muted)]">I&apos;ll get back to you within 24 hours.</span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="cnt-hero-scroll">
          <span>Scroll to explore</span>
          <div className="cnt-hero-scroll-line" />
        </div>
      </section>

      {/* FORM + INFO - Split Layout */}
      <section className="cnt-form-section">
        <div className="cnt-form-section-line" />

        <div className="container">
          <div className="cnt-form-layout">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="label">Get in touch</span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                  Send me a <span className="text-gradient-animated">message</span>
                </h2>
              </div>
              <ContactForm />
            </div>

            <div className="cnt-info">
              {/* Info cards */}
              <div className="cnt-info-cards">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="cnt-info-card"
                    style={{ '--info-color': info.color } as React.CSSProperties}
                  >
                    <div className="cnt-info-card-icon">
                      <info.icon />
                    </div>
                    <div className="cnt-info-card-content">
                      <span className="cnt-info-card-label">{info.label}</span>
                      {info.href ? (
                        <a href={info.href} className="cnt-info-card-value cnt-info-card-link">
                          {info.value}
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="cnt-info-card-value">{info.value}</span>
                      )}
                      {info.sub && <span className="cnt-info-card-sub">{info.sub}</span>}
                    </div>
                    <div className="cnt-info-card-glow" />
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="cnt-socials">
                <span className="cnt-socials-label">Connect</span>
                <div className="cnt-socials-grid">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cnt-social-link"
                    >
                      <social.icon className="cnt-social-icon" />
                      <span className="cnt-social-name">{social.name}</span>
                      <ArrowUpRight className="cnt-social-arrow" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className="cnt-availability">
                <div className="cnt-availability-dot" />
                <span>Currently accepting new projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Interactive Accordion */}
      <section className="cnt-faq">
        <div className="container">
          <div className="cnt-faq-header">
            <span className="label">FAQ</span>
            <h2 className="cnt-faq-title">
              Common
              <span className="text-gradient-animated"> Questions</span>
            </h2>
            <p className="cnt-faq-desc">
              Everything you need to know before we start working together.
            </p>
          </div>

          <div className="cnt-faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`cnt-faq-item ${openFaq === index ? 'cnt-faq-item-open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="cnt-faq-item-header">
                  <span className="cnt-faq-item-num">0{index + 1}</span>
                  <h3 className="cnt-faq-item-question">{faq.q}</h3>
                  <ChevronDown className="cnt-faq-item-chevron" />
                </div>
                <div className="cnt-faq-item-body">
                  <p className="cnt-faq-item-answer">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cnt-cta">
        <div className="cnt-cta-bg">
          <div className="cnt-cta-orb cnt-cta-orb-1" />
          <div className="cnt-cta-orb cnt-cta-orb-2" />
        </div>

        <div className="container relative z-10">
          <div className="cnt-cta-content">
            <h2 className="cnt-cta-title">
              Ready to
              <span className="cnt-cta-title-accent"> Ship?</span>
            </h2>
            <p className="cnt-cta-desc">
              The best time to start was yesterday.
              <br />
              The second best time is now.
            </p>
            <a href="mailto:hello@codewithseb.com" className="cnt-cta-btn">
              <span className="cnt-cta-btn-text">hello@codewithseb.com</span>
              <span className="cnt-cta-btn-arrow">
                <ArrowRight />
              </span>
            </a>
          </div>
        </div>
      </section>

      <FooterAwwwards />
    </div>
  );
}
