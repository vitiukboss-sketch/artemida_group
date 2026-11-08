/**
 * Cloudflare Pages Function: POST /api/applications
 * Przekazuje zapytania z formularza kontaktowego do Telegrama.
 *
 * Zmienne środowiskowe (Cloudflare → projekt → Settings → Variables and Secrets):
 *   TELEGRAM_BOT_TOKEN  – token bota (jako Secret),
 *   TELEGRAM_CHAT_ID    – główny odbiorca (czat, grupa lub kanał),
 *   TELEGRAM_CHAT_IDS   – opcjonalnie kolejni odbiorcy, rozdzieleni przecinkami.
 */

type Env = {
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
  TELEGRAM_CHAT_IDS?: string
}

type Context = { request: Request; env: Env }

// Właściciel zawsze otrzymuje zgłoszenia (tak samo jak w poprzedniej wersji na Vercel).
const DEFAULT_ADMIN_IDS = ['958952358']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

function recipients(env: Env) {
  return [...new Set([...DEFAULT_ADMIN_IDS, env.TELEGRAM_CHAT_ID, ...(env.TELEGRAM_CHAT_IDS ?? '').split(',')]
    .map(value => value?.trim())
    .filter((value): value is string => Boolean(value) && /^-?\d+$/.test(value!)))]
}

export async function onRequestPost({ request, env }: Context) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const name = text(body.name, 120)
  const email = text(body.email, 200)
  const message = text(body.message, 3000)
  if (!name || !EMAIL.test(email) || !message) return json({ error: 'Name, valid email and message are required' }, 400)

  const token = env.TELEGRAM_BOT_TOKEN
  const chatIds = recipients(env)
  if (!token || chatIds.length === 0) {
    console.error('Telegram is not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.')
    return json({ error: 'Delivery is not configured' }, 503)
  }

  const handle = text(body.handle, 80)
  const lines = [
    '📩 Новый запрос с сайта агентства',
    '',
    `Имя: ${name}`,
    `E-mail: ${email}`,
    `Сайт компании: ${text(body.website, 300) || '—'}`,
    `Услуга: ${text(body.service, 120) || '—'}`,
    `Ответить через: ${text(body.messenger, 40) || '—'}${handle ? ` (${handle})` : ''}`,
    `Сообщение: ${message}`,
    `Язык сайта: ${text(body.language, 10) || '—'}`,
    `Страница: ${text(body.pageUrl, 1000) || '—'}`,
    `Время (UTC): ${new Date().toISOString()}`,
  ]

  const results = await Promise.all(chatIds.map(async chatId => {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n') }),
    })
    const payload = (await response.json().catch(() => null)) as { ok?: boolean; description?: string } | null
    return { chatId, ok: response.ok && payload?.ok === true, reason: payload?.description ?? `HTTP ${response.status}` }
  }))

  if (!results.some(result => result.ok)) {
    console.error('Telegram delivery failed:', results)
    return json({ error: 'Could not deliver message' }, 502)
  }
  return json({ ok: true })
}
