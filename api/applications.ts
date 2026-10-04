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

/** Vercel serverless function. Environment variables never reach the browser. */
export default async function applications(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = (req.body ?? {}) as Record<string, unknown>
  const name = text(body.name, 120)
  const phone = text(body.phone, 60)
  const role = text(body.role, 80) || '—'
  const platform = text(body.platform, 80) || '—'
  const messenger = text(body.messenger, 40) || '—'
  const comment = text(body.comment, 2000) || '—'

  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' })

  try {
    await notifyAdmins({
      source: 'site', name, phone, role, platform, messenger, comment,
      language: text(body.language, 10), pageUrl: text(body.pageUrl, 1000),
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Could not forward application to Telegram:', error)
    return res.status(502).json({ error: 'Could not deliver application' })
  }
}
