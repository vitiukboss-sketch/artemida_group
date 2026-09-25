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

  const token = process.env.TELEGRAM_BOT_TOKEN
  const recipients = [...new Set([
    process.env.TELEGRAM_CHAT_ID,
    ...(process.env.TELEGRAM_CHAT_IDS ?? '').split(','),
  ].map(value => value?.trim()).filter(Boolean))]

  if (!token || recipients.length === 0) {
    console.error('Telegram environment variables are missing.')
    return res.status(503).json({ error: 'Delivery is not configured' })
  }

  const message = [
    '📨 Новая заявка с сайта',
    '',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Направление: ${role}`,
    `Платформа: ${platform}`,
    `Мессенджер: ${messenger}`,
    `Комментарий: ${comment}`,
    `Язык сайта: ${text(body.language, 10) || '—'}`,
    `Время (UTC): ${text(body.submittedAt, 40) || '—'}`,
    `Страница: ${text(body.pageUrl, 1000) || '—'}`,
  ].join('\n')

  try {
    const telegramResponses = await Promise.all(recipients.map(chatId => fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    })))

    const failed = telegramResponses.find(response => !response.ok)
    if (failed) throw new Error(`Telegram returned ${failed.status}`)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Could not forward application to Telegram:', error)
    return res.status(502).json({ error: 'Could not deliver application' })
  }
}
