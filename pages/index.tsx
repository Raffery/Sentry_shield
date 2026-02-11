import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBell, FaShieldAlt, FaPlug } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { plan: initialPlan } = router.query;

  const isActive = (path: string) => router.pathname === path;
  const navLinkStyle = (path: string) => ({
    color: "white",
    marginLeft: "1rem",
    textDecoration: "none",
    borderBottom: isActive(path) ? '3px solid white' : 'none',
    paddingBottom: '0.25rem'
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [plan, setPlan] = useState<string>(typeof initialPlan === 'string' ? initialPlan : '');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (typeof initialPlan === 'string') setPlan(initialPlan);
  }, [initialPlan]);

  useEffect(() => {
    if (router.asPath.includes('plan=')) {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.asPath]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    // Basic client validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please fill all required fields.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', text: 'Please provide a valid email address.' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, plan })
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Server error');
      setStatus({ type: 'success', text: body?.message || 'Message sent — thank you!' });
      setName(''); setEmail(''); setMessage(''); setPlan('');
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || 'Failed to send message.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#f8f6fb", minHeight: "100vh" }}>
      <Head>
        <title>Sentry Shield — Protect Your Website From Scammers</title>
        <meta name="description" content="Sentry Shield detects and blocks scam activity on sensitive web pages in real-time. Easy integration, real-time alerts, and enterprise controls." />
        <link rel="canonical" href="https://example.com/" />

        {/* Open Graph / Social */}
        <meta property="og:title" content="Sentry Shield — Protect Your Website From Scammers" />
        <meta property="og:description" content="Detect and block scam activity on sensitive pages with Sentry Shield. Real-time alerts, IP controls, and easy integration." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/" />
        <meta property="og:image" content="https://example.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{ backgroundColor: "#6a0dad", padding: "1rem 2rem", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <svg width="52" height="52" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path d="M32 4l18 6v12c0 13-9 24-18 30-9-6-18-17-18-30V10L32 4z" fill="url(#g)" opacity="0.98" />
              <circle cx="32" cy="28" r="7" fill="#6a0dad" />
              <path d="M32 36v6" stroke="#6a0dad" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, letterSpacing: 0.2 }}>Sentry Shield</span>
          </Link>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={navLinkStyle('/')}>Home</Link>
          <Link href="/about" style={navLinkStyle('/about')}>About</Link>
          <Link href="/pricing" style={navLinkStyle('/pricing')}>Pricing</Link>
        </nav>
      </header>

      

      {/* Home content */}
      {/* Hero Section */}
      <section style={{
        textAlign: "center",
        padding: "5rem 2rem",
        background: "linear-gradient(135deg, #6a0dad 0%, #9b59b6 100%)",
        color: "white"
      }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Protect Your Website From Scammers</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.2rem" }}>
          Sentry Shield helps banks and businesses secure sensitive web pages by detecting suspicious activity in real-time.
        </p>
        <Link
          href="/pricing"
          style={{
            display: "inline-block",
            backgroundColor: "white",
            color: "#6a0dad",
            padding: "0.8rem 2rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "2rem",
            textDecoration: "none",
            transition: "transform 0.2s ease, background-color 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "4rem 2rem", maxWidth: "1000px", margin: "auto" }}>
        <h3 style={{ textAlign: "center", marginBottom: "2rem", color: "#6a0dad", fontSize: "2rem" }}>Key Features</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem"
        }}>
          <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <FaBell size={32} color="#6a0dad" style={{ marginBottom: "1rem" }} />
            <h4 style={{ color: "#6a0dad" }}>Real-Time Alerts</h4>
            <p>Get notified instantly if suspicious activity is detected on your protected pages.</p>
          </div>
          <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <FaShieldAlt size={32} color="#6a0dad" style={{ marginBottom: "1rem" }} />
            <h4 style={{ color: "#6a0dad" }}>IP Whitelisting & Blacklisting</h4>
            <p>Manage trusted users and block potential scammers with ease.</p>
          </div>
          <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <FaPlug size={32} color="#6a0dad" style={{ marginBottom: "1rem" }} />
            <h4 style={{ color: "#6a0dad" }}>Easy Integration</h4>
            <p>Quickly add Sentry Shield to your website with a lightweight detection snippet.</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" style={{ padding: "3rem 2rem", backgroundColor: "#eee", textAlign: "center" }}>
        <h3 style={{ color: "#6a0dad", fontSize: "2rem" }}>Trusted by Leading Institutions</h3>
        <p style={{ fontStyle: "italic", marginTop: "1rem", maxWidth: "700px", margin: "1rem auto" }}>
          "Sentry Shield helped us reduce fraud by 40% in just two months." – Placeholder Bank
        </p>
        <p style={{ fontStyle: "italic", marginTop: "1rem", maxWidth: "700px", margin: "1rem auto" }}>
          "The integration was seamless and the alerts are incredibly accurate." – SecurePay Ltd.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: "4rem 2rem", backgroundColor: "#f8f6fb", textAlign: "center" }}>
        <h3 style={{ color: "#6a0dad", fontSize: "2rem", marginBottom: "2rem" }}>Get in Touch</h3>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              resize: "vertical"
            }}
          />

          <input type="hidden" name="plan" value={plan} />

          {status && (
            <div style={{ color: status.type === 'success' ? 'green' : 'crimson' }}>{status.text}</div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={sending}
            style={{
              backgroundColor: "#6a0dad",
              color: "white",
              padding: "0.8rem",
              border: "none",
              borderRadius: "6px",
              cursor: sending ? 'not-allowed' : 'pointer',
              fontSize: "1rem",
              opacity: sending ? 0.8 : 1
            }}
          >
            {sending ? 'Sending…' : 'Send Message'}
          </motion.button>
        </motion.form>
      </section>

      {/* About Tab Content
      {tab === 'about' && (
        <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
          <h2 style={{ color: '#6a0dad', fontSize: '2.25rem' }}>About Sentry Shield</h2>
          <p style={{ marginTop: 12, lineHeight: 1.6 }}>
            Sentry Shield is dedicated to protecting online services from scams and automated abuse. We combine browser-side detection
            techniques with server-side signals to provide real-time alerts and automated protections for sensitive web pages.
          </p>
          <h3 style={{ marginTop: 20 }}>Our Mission</h3>
          <p style={{ lineHeight: 1.6 }}>
            To make secure online experiences accessible for organizations of all sizes by delivering fast, accurate, and easy-to-integrate
            anti-fraud tooling.
          </p>
          <h3 style={{ marginTop: 20 }}>Team</h3>
          <p style={{ lineHeight: 1.6 }}>
            Rafael Augusto, Founder & CEO<br />
          </p>
        </section>
      )} */}

      {/* Pricing Tab Content
      {tab === 'pricing' && (
        <section style={{ padding: '4rem 2rem', backgroundColor: '#f7f5fb' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#6a0dad', fontSize: '2.25rem' }}>Pricing</h2>
            <p style={{ marginTop: 8 }}>Simple, predictable pricing — pay only for what you protect.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }}>
              <div style={{ background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                <h4>Starter</h4>
                <p style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>$29/mo</p>
                <p>Up to 50 protected pages, email support, basic alerts.</p>
                <button style={{ marginTop: 12, padding: '0.6rem 1rem', background: '#6a0dad', color: 'white', border: 'none', borderRadius: 6 }}>Choose</button>
              </div>

              <div style={{ background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', border: '2px solid #6a0dad' }}>
                <h4>Growth</h4>
                <p style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>$99/mo</p>
                <p>Everything in Starter plus priority support and advanced rules.</p>
                <button style={{ marginTop: 12, padding: '0.6rem 1rem', background: '#6a0dad', color: 'white', border: 'none', borderRadius: 6 }}>Choose</button>
              </div>

              <div style={{ background: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                <h4>Enterprise</h4>
                <p style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>Contact us</p>
                <p>Custom SLAs, dedicated onboarding, and on-prem options.</p>
                <button style={{ marginTop: 12, padding: '0.6rem 1rem', background: '#6a0dad', color: 'white', border: 'none', borderRadius: 6 }}>Contact</button>
              </div>
            </div>
          </div>
        </section>
      )} */}

      {/* Footer */}
      <footer style={{ backgroundColor: "#6a0dad", color: "white", padding: "1rem", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} Sentry Shield. All rights reserved.</p>
      </footer>
    </div>
  );
}