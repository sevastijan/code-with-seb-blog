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

    // Email to me (notification)
    await resend.emails.send({
      from: 'Code With Seb <contact@codewithseb.com>',
      to: 'hello@codewithseb.com',
      replyTo: body.email,
      subject: `New contact: ${body.name}${body.company ? ` (${body.company})` : ''}`,
      html: buildNotificationEmail(body),
    });

    // Confirmation email to the sender
    await resend.emails.send({
      from: 'Sebastian from Code With Seb <contact@codewithseb.com>',
      to: body.email,
      subject: "Got your message — I'll be in touch soon",
      html: buildConfirmationEmail(body.name),
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

function buildNotificationEmail(body: ContactFormData): string {
  return `
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
  `;
}

function buildConfirmationEmail(name: string): string {
  const firstName = escapeHtml(name.split(' ')[0]);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; border-bottom: 2px solid #ff3d00;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Code With Seb</span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #ff3d00; font-weight: 600;">Message Received</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 48px 40px 32px;">
              <h1 style="margin: 0 0 8px; font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -1px; line-height: 1.1;">
                Hey ${firstName}<span style="color: #ff3d00;">.</span>
              </h1>
              <p style="margin: 0; font-size: 15px; color: #666666; line-height: 1.6;">
                Thanks for reaching out.
              </p>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 20px; font-size: 15px; color: #b0b0b0; line-height: 1.8;">
                I got your message and I&rsquo;ll get back to you within <strong style="color: #ffffff;">24 hours</strong> &mdash; usually much faster.
              </p>
              <p style="margin: 0 0 20px; font-size: 15px; color: #b0b0b0; line-height: 1.8;">
                In the meantime, if you want to add anything or share project details, just reply to this email directly.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(to right, #ff3d00, #ff3d0000);"></div>
            </td>
          </tr>

          <!-- What Happens Next -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #ff3d00; font-weight: 600;">
                What happens next
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; vertical-align: top; width: 32px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background: #111111; border: 1px solid #222222; border-radius: 4px; text-align: center; line-height: 24px; font-size: 12px; color: #ff3d00; font-weight: 700;">1</span>
                  </td>
                  <td style="padding: 12px 0 12px 12px;">
                    <p style="margin: 0; font-size: 14px; color: #ffffff; font-weight: 600;">I review your message</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #666666;">Understanding your project, goals, and timeline.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; vertical-align: top; width: 32px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background: #111111; border: 1px solid #222222; border-radius: 4px; text-align: center; line-height: 24px; font-size: 12px; color: #ff3d00; font-weight: 700;">2</span>
                  </td>
                  <td style="padding: 12px 0 12px 12px;">
                    <p style="margin: 0; font-size: 14px; color: #ffffff; font-weight: 600;">We jump on a quick call</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #666666;">15-30 min discovery call to align on scope and approach.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; vertical-align: top; width: 32px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background: #111111; border: 1px solid #222222; border-radius: 4px; text-align: center; line-height: 24px; font-size: 12px; color: #ff3d00; font-weight: 700;">3</span>
                  </td>
                  <td style="padding: 12px 0 12px 12px;">
                    <p style="margin: 0; font-size: 14px; color: #ffffff; font-weight: 600;">I send a proposal</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #666666;">Clear scope, timeline, and pricing. No surprises.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(to right, #ff3d0000, #ff3d00, #ff3d0000);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px;">
              <p style="margin: 0 0 20px; font-size: 14px; color: #ffffff; font-weight: 600;">
                Talk soon, Seb &#x1F44A;
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 16px;">
                    <a href="https://codewithseb.com" style="font-size: 12px; color: #ff3d00; text-decoration: none;">codewithseb.com</a>
                  </td>
                  <td style="padding-right: 16px; color: #333333;">|</td>
                  <td style="padding-right: 16px;">
                    <a href="https://github.com/sevastijan" style="font-size: 12px; color: #666666; text-decoration: none;">GitHub</a>
                  </td>
                  <td style="padding-right: 16px; color: #333333;">|</td>
                  <td style="padding-right: 16px;">
                    <a href="https://www.linkedin.com/in/sebastiansleczka/" style="font-size: 12px; color: #666666; text-decoration: none;">LinkedIn</a>
                  </td>
                  <td style="padding-right: 16px; color: #333333;">|</td>
                  <td>
                    <a href="https://www.youtube.com/@CodeWithSeb" style="font-size: 12px; color: #666666; text-decoration: none;">YouTube</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom Bar -->
          <tr>
            <td style="padding: 0;">
              <div style="height: 3px; background: linear-gradient(to right, #ff3d00, #8b5cf6, #00ff88);"></div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
