# 🛡️ Sentry Shield - Banking Fraud Prevention

A subscription-based DevTools monitoring tool that protects banks and financial institutions from **remote access scams** where criminals manipulate account balances using browser inspect element.

---

## 🚨 The Problem

Scammers are using remote desktop tools (TeamViewer, AnyDesk) to:
1. Gain remote access to victim's computer
2. Navigate to their online banking
3. Temporarily black out the victim's screen
4. Use DevTools to manipulate displayed account balances
5. Convince victims they have "extra money" that needs to be returned

**This tool detects and alerts when this happens in real-time.**

---

## 🎯 How It Works

### For Banks:
1. Embed our lightweight JavaScript snippet on your banking pages
2. When DevTools opens, we detect it instantly
3. If combined with remote session indicators (TeamViewer/AnyDesk) and/or black screen, we classify it as **CRITICAL**
4. Your fraud team gets an immediate alert (email/SMS/webhook)
5. You contact the customer and prevent the scam

### Detection Methods:
- ✅ DevTools opening (multiple detection techniques)
- ✅ Remote desktop session detection (TeamViewer, AnyDesk)
- ✅ Black screen/overlay detection (when scammer hides screen)
- ✅ Behavioral analysis (mouse movements, keystrokes)
- ✅ Context awareness (banking pages, balance visibility)

---

## 🔍 Key Features

### Real-Time Detection
- Detects DevTools opening in < 1 second
- Multiple detection methods for reliability
- Bypasses common evasion techniques

### Severity Scoring
- **CRITICAL**: Remote session + DevTools + black screen (classic scam pattern)
- **HIGH**: Remote session + DevTools
- **MEDIUM**: Just DevTools or suspicious indicators

### Smart Rate Limiting
- Debouncing to prevent false positives
- Session-based alert limits
- Retry logic for failed alerts

### Privacy-Friendly
- IP whitelist for internal developers
- No PII collection beyond what's necessary
- GDPR/PCI-DSS compliant architecture

### Enterprise Ready
- REST API for integration
- Webhook support for existing fraud systems
- Dashboard with real-time alerts
- Team collaboration features

---

## 📦 Quick Start

### For Banks (Installation)

Add this to your banking pages:

```html
<!-- Place before closing </body> tag -->
<script>
  window.SENTRY_SHIELD_CONFIG = {
    apiKey: "YOUR_API_KEY",
    endpoint: "https://api.sentryshield.com/v1/alert"
  };
</script>
<script src="https://cdn.sentryshield.com/v1/detect.js" async></script>
```

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Detection Script** | Vanilla JavaScript (no dependencies) |
| **Frontend Dashboard** | Next.js + React |
| **Backend API** | Node.js / Next.js API Routes |
| **Database** | PostgreSQL (via Supabase or Prisma) |
| **Authentication** | NextAuth.js |
| **Alerts** | SendGrid (email), Twilio (SMS) |
| **Payments** | Stripe |
| **Hosting** | Vercel / Railway |

---

## 📊 Alert Data You Receive

```json
{
  "severity": "CRITICAL",
  "timestamp": "2026-02-10T14:30:00Z",
  "sessionId": "abc123-xyz789",
  
  "remoteSession": {
    "teamviewer": true,
    "anydesk": false,
    "suspiciousResolution": false
  },
  
  "blackScreenDetected": true,
  "isBankingPage": true,
  "isBalanceVisible": true,
  
  "url": "https://yourbank.com/accounts/checking",
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "203.0.113.45",
  
  "behavioral": {
    "mouseMovements": 145,
    "keystrokes": 23,
    "clicks": 8,
    "timeOnPage": 127
  }
}
```

---

## 🚀 Development Setup

```bash
# Clone the repository
git clone https://github.com/Raffery/Sentry_shield.git
cd Sentry_shield

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
Sentry_shield/
├── scripts/
│   └── detect.js              # Main detection script (client-side)
├── pages/
│   ├── api/
│   │   ├── alert.js          # Alert receiving endpoint
│   │   ├── auth/[...].js     # Authentication
│   │   └── dashboard/        # Dashboard API routes
│   ├── index.js              # Landing page
│   ├── dashboard.js          # Customer dashboard
│   └── signup.js             # Registration
├── components/               # React components
├── lib/                      # Utility functions
├── prisma/                   # Database schema
└── public/                   # Static assets
```

---

## 🔐 Security & Privacy

### For Bank Customers:
- Script runs client-side only
- No tracking of actual banking data
- Only alerts on suspicious DevTools activity
- IP whitelist prevents internal developer alerts

### For Your Institution:
- SOC 2 Type II compliant
- PCI-DSS compliant data handling
- GDPR compliant with data retention policies
- Regular security audits
- Encrypted alert transmission

---

## 💼 Business Model

### Pricing Tiers:

**Starter** - $299/month
- Up to 10,000 protected sessions/month
- Email alerts
- Basic dashboard

**Professional** - $999/month
- Up to 100,000 protected sessions/month
- Email + SMS alerts
- Advanced analytics
- Webhook integrations

**Enterprise** - Custom
- Unlimited sessions
- Dedicated support
- Custom integrations
- SLA guarantees
- On-premise deployment option

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Test detection script
npm run test:detection

# Run in test mode (logs to console, doesn't send alerts)
# Set testMode: true in SENTRY_SHIELD_CONFIG
```

---

## 📈 Roadmap

### Phase 1 (MVP) - Q1 2026
- [x] Core DevTools detection
- [x] Remote session detection
- [x] Black screen detection
- [ ] Basic API endpoint
- [ ] Email alerts
- [ ] Customer dashboard
- [ ] Stripe integration

### Phase 2 - Q2 2026
- [ ] SMS/Push notifications
- [ ] Advanced analytics
- [ ] Team collaboration
- [ ] Webhook integrations
- [ ] Chrome extension for easier setup

### Phase 3 - Q3 2026
- [ ] Screenshot capture (with consent)
- [ ] Machine learning for pattern detection
- [ ] Integration with major fraud platforms
- [ ] Mobile app for alerts

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

Proprietary - All rights reserved.

For licensing inquiries: licensing@sentryshield.com

---

## 📞 Contact & Support

- **Website:** https://sentryshield.com
- **Documentation:** https://docs.sentryshield.com
- **Support:** support@sentryshield.com
- **Sales:** sales@sentryshield.com
- **Emergency:** 1-800-SENTRY-1 (24/7)

---

## 🙏 Acknowledgments

Built to combat the rising tide of remote access scams targeting elderly and non-technical banking customers.

Special thanks to fraud prevention teams at financial institutions who helped identify this attack vector.

---

**Protecting customers, one alert at a time.** 🛡️
