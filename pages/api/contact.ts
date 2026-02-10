import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message?: string; error?: string }

// Simple in-memory rate limiter (per-IP). For production use a shared store (Redis).
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_PER_WINDOW = 5
const ipMap: Map<string, number[]> = new Map()

function cleanOld(timestamps: number[]) {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS
  return timestamps.filter(t => t > cutoff)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown'

  const now = Date.now()
  const entry = ipMap.get(ip) || []
  const cleaned = cleanOld(entry)
  if (cleaned.length >= MAX_PER_WINDOW) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' })
  }
  cleaned.push(now)
  ipMap.set(ip, cleaned)

  const { name, email, message, plan } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  if (String(message).length > 2000) {
    return res.status(400).json({ error: 'Message is too long.' })
  }

  // TODO: integrate real email provider or CRM here using env vars (SMTP/API)
  // For now, log the submission to server logs for manual handling.
  console.log('[contact] submission', { time: new Date().toISOString(), ip, name, email, plan: plan || null, message })

  // Optional: persist to file for simple inbox (not recommended for production)
  try {
    // Only attempt file write when running locally (NODE_ENV !== 'production')
    if (process.env.NODE_ENV !== 'production') {
      const fs = await import('fs')
      const path = await import('path')
      const out = path.join(process.cwd(), 'contact-submissions.log')
      const line = JSON.stringify({ time: new Date().toISOString(), ip, name, email, plan: plan || null, message }) + '\n'
      fs.appendFileSync(out, line)
    }
  } catch (e) {
    console.warn('Failed to persist contact submission to file', e)
  }

  return res.status(200).json({ message: 'Thanks — your message was received.' })
}
