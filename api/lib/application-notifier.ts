import { getAdminIds } from './admins.js'

export type AgencyLead = {
  source: 'agency'
  name: string
  email: string
  website: string
  service: string
  messenger: string
  handle: string
  message: string
  language?: string
  pageUrl?: string
}

export type ApplicationDetails = {
  name: string
  phone: string
  role: string
  platform: string
  messenger: string
  comment: string
  source: 'site' | 'bot'
  language?: string
  pageUrl?: string
  telegramUser?: { id: number; username?: string; firstName?: string }
}

function clean(value: string, maxLength: number) {
  return value.trim().slice(0, maxLength) || '—'
}

function agencyLines(lead: AgencyLead) {
  return [
    '📩 Новый запрос с сайта агентства',
    '',
    `Имя: ${clean(lead.name, 120)}`,
    `E-mail: ${clean(lead.email, 200)}`,
    `Сайт компании: ${clean(lead.website, 300)}`,
    `Услуга: ${clean(lead.service, 120)}`,
    `Ответить через: ${clean(lead.messenger, 40)}${lead.handle && lead.handle !== '—' ? ` (${clean(lead.handle, 80)})` : ''}`,
    `Сообщение: ${clean(lead.message, 3000)}`,
    `Язык сайта: ${clean(lead.language ?? '', 10)}`,
    `Страница: ${clean(lead.pageUrl ?? '', 1000)}`,
  ]
}

/** Sends every completed application through the administrator bot. */
export async function notifyAdmins(application: ApplicationDetails | AgencyLead) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const recipients = await getAdminIds()
  if (!token || recipients.length === 0) throw new Error('Telegram delivery is not configured')

  const lines = application.source === 'agency' ? agencyLines(application) : [
    '📨 Новая заявка',
    `Источник: ${application.source === 'bot' ? 'Telegram-бот' : 'сайт'}`,
    '',
    `Имя: ${clean(application.name, 120)}`,
    `Телефон: ${clean(application.phone, 60)}`,
    `Направление: ${clean(application.role, 80)}`,
    `Платформа: ${clean(application.platform, 80)}`,
    `Мессенджер: ${clean(application.messenger, 40)}`,
    `Комментарий: ${clean(application.comment, 2000)}`,
  ]

  if (application.source === 'site') {
    lines.push(`Язык сайта: ${clean(application.language ?? '', 10)}`, `Страница: ${clean(application.pageUrl ?? '', 1000)}`)
  }
  if (application.source !== 'agency' && application.telegramUser) {
    const username = application.telegramUser.username ? `@${application.telegramUser.username}` : '—'
    lines.push(`Telegram: ${username} · ID ${application.telegramUser.id}`)
  }
  lines.push(`Время (UTC): ${new Date().toISOString()}`)

  const message = lines.join('\n')
  const results = await Promise.all(recipients.map(async chatId => {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: message }),
    })
    const payload = await response.json().catch(() => null) as { ok?: boolean; description?: string } | null
    return { chatId, ok: response.ok && payload?.ok === true, reason: payload?.description ?? `HTTP ${response.status}` }
  }))
  const delivered = results.filter(result => result.ok)
  if (delivered.length === 0) throw new Error(`Telegram delivery failed: ${results.map(result => result.reason).join('; ')}`)
  const failed = results.filter(result => !result.ok)
  if (failed.length) console.warn('Some Telegram administrators did not receive an application:', failed)
}
