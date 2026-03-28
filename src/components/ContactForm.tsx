'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#00ff88]/10 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-[#00ff88]" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
        <p className="text-[var(--c-text-muted)] mb-8">
          I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-[var(--c-accent)] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClasses =
    'w-full px-0 py-4 bg-transparent border-0 border-b border-[var(--c-border)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] focus:outline-none focus:border-[var(--c-accent)] transition-colors duration-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="label mb-3 block">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
            placeholder="Your name"
            disabled={status === 'sending'}
          />
        </div>
        <div>
          <label htmlFor="email" className="label mb-3 block">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
            placeholder="your@email.com"
            disabled={status === 'sending'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="company" className="label mb-3 block">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={inputClasses}
            placeholder="Company name"
            disabled={status === 'sending'}
          />
        </div>
        <div>
          <label htmlFor="budget" className="label mb-3 block">
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className={`${inputClasses} cursor-pointer`}
            disabled={status === 'sending'}
          >
            <option value="">Select budget</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
            <option value="$50,000+">$50,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label mb-3 block">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClasses} resize-none`}
          placeholder="Tell me about your project..."
          disabled={status === 'sending'}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-magnetic disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send message</span>
            <ArrowUpRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
