# 🛡️ Anti-Scam Tool (WIP)

A subscription-based anti-scam monitoring tool that alerts website owners when someone opens browser DevTools on sensitive pages — designed to protect businesses from fraud, scams, and content theft.

---

## 🔍 Overview

This tool allows paid users to embed a JavaScript snippet on their website that:
- Detects if DevTools has been opened on a specific page.
- Sends an alert (email/SMS/push) to the website owner.
- Ignores activity from whitelisted IPs (e.g., internal devs).
- Flags blacklisted IPs for immediate attention.

---

## 🧱 Features (MVP)

- [x] DevTools detection via client-side JS
- [x] API for alert receiving and processing
- [x] User dashboard to manage:
  - Whitelist / blacklist IPs
  - Page-level settings
  - Subscription status
- [ ] Email or push notifications (via SendGrid/Firebase/Twilio)
- [ ] Stripe integration for subscriptions
- [ ] Secure auth system (NextAuth or similar)

---

## 🛠️ Tech Stack

| Layer         | Tech            |
|---------------|-----------------|
| Frontend UI   | Next.js + React |
| Backend API   | Node.js / Next API routes |
| Styling       | Tailwind CSS (TBD) |
| Auth          | NextAuth.js or custom JWT |
| Alerts        | SendGrid, Twilio, Firebase (TBD) |
| DB            | PostgreSQL / Supabase / Prisma |
| Billing       | Stripe |
| Hosting       | Vercel / Railway / Render |

---

## ⚙️ Getting Started

```bash
git clone https://github.com/your-username/anti-scam-tool.git
cd anti-scam-tool
npm install
npm run dev
