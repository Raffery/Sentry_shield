import Head from "next/head";
import Link from "next/link";

export default function Pricing() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#f8f6fb", minHeight: "100vh" }}>
      <Head>
        <title>Pricing — Sentry Shield</title>
        <meta name="description" content="Simple, predictable pricing for Sentry Shield — pay for the pages you protect. Starter, Growth, and Enterprise plans available." />
        <link rel="canonical" href="https://example.com/pricing" />

        <meta property="og:title" content="Pricing — Sentry Shield" />
        <meta property="og:description" content="Simple, predictable pricing for Sentry Shield — Starter, Growth, and Enterprise plans." />
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
          <Link href="/" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>Home</Link>
          <Link href="/about" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>About</Link>
          <Link href="/pricing" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>Pricing</Link>
        </nav>
      </header>

      <main style={{ padding: '4rem 2rem', backgroundColor: '#f7f5fb' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ color: '#6a0dad', fontSize: '2.25rem' }}>Pricing</h1>
          <p style={{ marginTop: 8 }}>Simple, predictable pricing — pay only for what you protect.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }}>
            <div style={{ background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <h4>Starter</h4>
              <p style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>$29/mo</p>
              <p>Up to 50 protected pages, email support, basic alerts.</p>
                <Link href={{ pathname: '/', query: { plan: 'Starter' } }} style={{ marginTop: 12, display: 'inline-block', padding: '0.6rem 1rem', background: '#6a0dad', color: 'white', borderRadius: 6, textDecoration: 'none' }}>Choose</Link>
            </div>

            <div style={{ background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', border: '2px solid #6a0dad' }}>
              <h4>Growth</h4>
              <p style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>$99/mo</p>
              <p>Everything in Starter plus priority support and advanced rules.</p>
                <Link href={{ pathname: '/', query: { plan: 'Growth' } }} style={{ marginTop: 12, display: 'inline-block', padding: '0.6rem 1rem', background: '#6a0dad', color: 'white', borderRadius: 6, textDecoration: 'none' }}>Choose</Link>
            </div>

            <div style={{ background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <h4>Enterprise</h4>
              <p style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>Contact us</p>
              <p>Custom SLAs, dedicated onboarding, and on-prem options.</p>
                <Link href={{ pathname: '/', query: { plan: 'Enterprise' } }} style={{ marginTop: 12, display: 'inline-block', padding: '0.6rem 1rem', background: '#6a0dad', color: 'white', borderRadius: 6, textDecoration: 'none' }}>Contact</Link>
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
