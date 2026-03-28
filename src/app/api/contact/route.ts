import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Code With Seb <contact@codewithseb.com>',
      to: 'hello@codewithseb.com',
      replyTo: body.email,
      subject: `New contact: ${body.name}${body.company ? ` (${body.company})` : ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(body.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td>
          </tr>
          ${body.company ? `
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Company</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(body.company)}</td>
          </tr>` : ''}
          ${body.budget ? `
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Budget</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${escapeHtml(body.budget)}</td>
          </tr>` : ''}
        </table>
        <h3 style="margin-top: 24px;">Message</h3>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 8px;">${escapeHtml(body.message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
