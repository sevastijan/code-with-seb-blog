import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') || 'Code With Seb';
  const category = searchParams.get('category') || '';
  const date = searchParams.get('date') || '';
  const readTime = searchParams.get('readTime') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Green accent glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Top: category + meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
          {category && (
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#00ff88',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                padding: '6px 16px',
              }}
            >
              {category}
            </div>
          )}
          {date && (
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
              {date}
            </div>
          )}
          {readTime && (
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)' }}>
              {readTime}
            </div>
          )}
        </div>

        {/* Center: title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            zIndex: 1,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? '48px' : title.length > 40 ? '56px' : '64px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* @ icon */}
            <div
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00ff88',
                color: '#0a0a0a',
                fontSize: '28px',
                fontWeight: 800,
              }}
            >
              @
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                codewithseb
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                Fractional CTO & AI Automation
              </div>
            </div>
          </div>

          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            codewithseb.com
          </div>
        </div>

        {/* Bottom green line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #00ff88, rgba(0, 255, 136, 0.3), transparent)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
