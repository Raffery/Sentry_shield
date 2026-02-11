import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Pricing() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const isActive = (path: string) => router.pathname === path;
  const navLinkStyle = (path: string) => ({
    color: "white",
    marginLeft: "1rem",
    textDecoration: "none",
    borderBottom: isActive(path) ? '3px solid white' : 'none',
    paddingBottom: '0.25rem'
  });
  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#f8f6fb", minHeight: "100vh" }}>
      <Head>
        <title>Pricing — Sentry Shield</title>
        <meta name="description" content="Enterprise SaaS pricing for Sentry Shield — $7,500/month or $81,000/year (10% yearly discount). Custom SLAs, dedicated onboarding, and on-prem options." />
        <link rel="canonical" href="https://example.com/pricing" />

        <meta property="og:title" content="Pricing — Sentry Shield" />
        <meta property="og:description" content="Enterprise SaaS pricing for Sentry Shield — $7,500/month or $81,000/year with 10% yearly discount." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/pricing" />
        <meta property="og:image" content="https://example.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header style={{ backgroundColor: "#6a0dad", padding: "1rem 2rem", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
              <path d="M32 4l18 6v12c0 13-9 24-18 30-9-6-18-17-18-30V10L32 4z" fill="#fff" opacity="0.95" />
              <circle cx="32" cy="28" r="6" fill="#6a0dad" />
            </svg>
            <span style={{ color: 'white', fontSize: '1.05rem', fontWeight: 700 }}>Sentry Shield</span>
          </Link>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={navLinkStyle('/')}>Home</Link>
          <Link href="/about" style={navLinkStyle('/about')}>About</Link>
          <Link href="/pricing" style={navLinkStyle('/pricing')}>Pricing</Link>
        </nav>
      </header>

      <main style={{ padding: '4rem 2rem', backgroundColor: '#f7f5fb' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ color: '#6a0dad', fontSize: '2.25rem' }}>Pricing</h1>
          <p style={{ marginTop: 8 }}>Simple, transparent pricing for enterprise fraud protection.</p>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24, marginBottom: 32 }}>
            <button
              onClick={() => setBillingPeriod('monthly')}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: 6,
                border: billingPeriod === 'monthly' ? '2px solid #6a0dad' : '1px solid #ccc',
                background: billingPeriod === 'monthly' ? '#6a0dad' : 'white',
                color: billingPeriod === 'monthly' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: 6,
                border: billingPeriod === 'yearly' ? '2px solid #6a0dad' : '1px solid #ccc',
                background: billingPeriod === 'yearly' ? '#6a0dad' : 'white',
                color: billingPeriod === 'yearly' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Yearly <span style={{ fontSize: '0.85rem' }}>(Save 10%)</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }}>
            <div style={{ background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', margin: '0 auto', maxWidth: 350 }}>
              <h4>Enterprise</h4>
              <p style={{ fontSize: 28, fontWeight: 700, margin: '12px 0' }}>
                {billingPeriod === 'monthly' ? '$7,500' : '$81,000'}
              </p>
              <p style={{ color: '#666', marginBottom: 12 }}>
                {billingPeriod === 'monthly' ? 'per month' : 'per year'}
              </p>
              <p style={{ textAlign: 'left', lineHeight: 1.6, marginBottom: 16 }}>
                ✓ Custom SLAs<br/>
                ✓ Dedicated onboarding<br/>
                ✓ On-prem deployment options<br/>
                ✓ Priority support<br/>
                ✓ Advanced customization
              </p>
                <Link href={{ pathname: '/', query: { plan: 'Enterprise' } }} style={{ marginTop: 12, display: 'inline-block', padding: '0.6rem 1rem', background: '#6a0dad', color: 'white', borderRadius: 6, textDecoration: 'none' }}>Contact Sales</Link>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ backgroundColor: "#6a0dad", color: "white", padding: "1rem", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} Sentry Shield. All rights reserved.</p>
      </footer>
    </div>
  );
}
