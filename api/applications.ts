import { notifyAdmins } from './lib/application-notifier.js'

type RequestLike = {
  method?: string
  body?: unknown
}

type ResponseLike = {
  status: (code: number) => ResponseLike
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Vercel serverless function. Environment variables never reach the browser. */
export default async function applications(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = (req.body ?? {}) as Record<string, unknown>
  const name = text(body.name, 120)
  const language = text(body.language, 10)
  const pageUrl = text(body.pageUrl, 1000)

  try {
    if (body.type === 'agency') {
      // Zapytanie ze strony agencji: imię, e-mail i wiadomość są wymagane.
      const email = text(body.email, 200)
      const message = text(body.message, 3000)
      if (!name || !EMAIL.test(email) || !message) return res.status(400).json({ error: 'Name, valid email and message are required' })

      await notifyAdmins({
        source: 'agency', name, email, message,
        website: text(body.website, 300) || '—',
        service: text(body.service, 120) || '—',
        messenger: text(body.messenger, 40) || '—',
        handle: text(body.handle, 80) || '—',
        language, pageUrl,
      })
      return res.status(200).json({ ok: true })
    }

    // Starsze zgłoszenia (kierowcy i kurierzy).
    const phone = text(body.phone, 60)
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' })
    await notifyAdmins({
      source: 'site', name, phone,
      role: text(body.role, 80) || '—',
      platform: text(body.platform, 80) || '—',
      messenger: text(body.messenger, 40) || '—',
      comment: text(body.comment, 2000) || '—',
      language, pageUrl,
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Could not forward application to Telegram:', error)
    return res.status(502).json({ error: 'Could not deliver application' })
  }
}
