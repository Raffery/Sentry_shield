import Head from "next/head";
import { useState } from "react";
import { FaBell, FaShieldAlt, FaPlug } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [tab, setTab] = useState<'home' | 'about' | 'pricing'>('home');

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#f8f6fb", minHeight: "100vh" }}>
      <Head>
        <title>Sentry Shield</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header style={{ backgroundColor: "#6a0dad", padding: "1rem 2rem", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Sentry Shield</h1>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#features" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>Features</a>
          <a href="#trust" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>Trust</a>

          <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
            <button
              onClick={() => setTab('home')}
              aria-pressed={tab === 'home'}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 6,
                border: tab === 'home' ? '2px solid rgba(255,255,255,0.9)' : '1px solid rgba(255,255,255,0.6)',
                background: tab === 'home' ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >Home</button>

            <button
              onClick={() => setTab('about')}
              aria-pressed={tab === 'about'}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 6,
                border: tab === 'about' ? '2px solid rgba(255,255,255,0.9)' : '1px solid rgba(255,255,255,0.6)',
                background: tab === 'about' ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >About Us</button>

            <button
              onClick={() => setTab('pricing')}
              aria-pressed={tab === 'pricing'}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 6,
                border: tab === 'pricing' ? '2px solid rgba(255,255,255,0.9)' : '1px solid rgba(255,255,255,0.6)',
                background: tab === 'pricing' ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >Pricing</button>
          </div>
        </nav>
      </header>

      

      {/* Home Tab Content */}
      {tab === 'home' && (
        <>
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
            <button
              style={{
                backgroundColor: "white",
                color: "#6a0dad",
                padding: "0.8rem 2rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem",
                marginTop: "2rem",
                transition: "transform 0.2s ease, background-color 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Get Started
            </button>
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
          <section style={{ padding: "4rem 2rem", backgroundColor: "#f8f6fb", textAlign: "center" }}>
            <h3 style={{ color: "#6a0dad", fontSize: "2rem", marginBottom: "2rem" }}>Get in Touch</h3>

            <motion.form
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
                style={{
                  padding: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  resize: "vertical"
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: "#6a0dad",
                  color: "white",
                  padding: "0.8rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </section>
        </>
      )}

      {/* About Tab Content */}
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
      )}

      {/* Pricing Tab Content */}
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
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: "#6a0dad", color: "white", padding: "1rem", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} Sentry Shield. All rights reserved.</p>
      </footer>
    </div>
  );
}