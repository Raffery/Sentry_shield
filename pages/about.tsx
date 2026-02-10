import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#f8f6fb", minHeight: "100vh" }}>
      <Head>
        <title>About — Sentry Shield</title>
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

      <main style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
        <h1 style={{ color: '#6a0dad', fontSize: '2.25rem' }}>About Sentry Shield</h1>
        <p style={{ marginTop: 12, lineHeight: 1.6 }}>
          Sentry Shield is dedicated to protecting online services from scams and automated abuse. We combine browser-side detection
          techniques with server-side signals to provide real-time alerts and automated protections for sensitive web pages.
        </p>
        <h2 style={{ marginTop: 20 }}>Our Mission</h2>
        <p style={{ lineHeight: 1.6 }}>
          To make secure online experiences accessible for organizations of all sizes by delivering fast, accurate, and easy-to-integrate
          anti-fraud tooling.
        </p>
        <h2 style={{ marginTop: 20 }}>Team</h2>
        <p style={{ lineHeight: 1.6 }}>
          Rafael Augusto, Founder & CEO
        </p>
      </main>

      <footer style={{ backgroundColor: "#6a0dad", color: "white", padding: "1rem", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} Sentry Shield. All rights reserved.</p>
      </footer>
    </div>
  );
}
