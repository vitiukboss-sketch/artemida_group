import { getAdminIds } from './admins.js'

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

/** Sends every completed application through the administrator bot. */
export async function notifyAdmins(application: ApplicationDetails) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const recipients = await getAdminIds()
  if (!token || recipients.length === 0) throw new Error('Telegram delivery is not configured')

  const lines = [
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
  if (application.telegramUser) {
    const username = application.telegramUser.username ? `@${application.telegramUser.username}` : '—'
    lines.push(`Telegram: ${username} · ID ${application.telegramUser.id}`)
  }
  lines.push(`Время (UTC): ${new Date().toISOString()}`)

  const message = lines.join('\n')
  const responses = await Promise.all(recipients.map(chatId => fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: message }),
  })))
  const failed = responses.find(response => !response.ok)
  if (failed) throw new Error(`Telegram returned ${failed.status}`)
}
