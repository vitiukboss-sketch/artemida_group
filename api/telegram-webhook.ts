import { addAdmin, isAdmin, isAdminStorageReady } from './lib/admins.js'

type TelegramUser = {
  id: number
}

type TelegramMessage = {
  message_id: number
  chat: { id: number }
  from?: TelegramUser
  text?: string
  reply_to_message?: TelegramMessage
}

type TelegramUpdate = {
  message?: TelegramMessage
  callback_query?: {
    id: string
    from: TelegramUser
    message?: TelegramMessage
    data?: string
  }
}

type RequestLike = {
  method?: string
  body?: TelegramUpdate
  headers?: Record<string, string | string[] | undefined>
}

type ResponseLike = {
  status: (code: number) => ResponseLike
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function requestHeader(req: RequestLike, key: string) {
  const value = req.headers?.[key] ?? req.headers?.[key.toLowerCase()]
  return Array.isArray(value) ? value[0] : value
}

async function telegram(method: string, body: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) throw new Error('Telegram token is missing')

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Telegram returned ${response.status}`)
}

async function showAdminMenu(chatId: string) {
  await telegram('sendMessage', {
    chat_id: chatId,
    text: 'Панель администратора',
    reply_markup: {
      inline_keyboard: [[{ text: '➕ Добавить админа', callback_data: 'admin:add' }]],
    },
  })
}

function isAdminIdRequest(message: TelegramMessage) {
  return message.reply_to_message?.from?.id && text(message.reply_to_message.text).includes('ADMIN_ADD_ID_REQUEST')
}

/** Receives Telegram updates. The route is protected by TELEGRAM_WEBHOOK_SECRET. */
export default async function telegramWebhook(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!secret || requestHeader(req, 'x-telegram-bot-api-secret-token') !== secret) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const update = req.body ?? {}
  try {
    const callback = update.callback_query
    if (callback?.data === 'admin:add' && callback.message) {
      const chatId = String(callback.message.chat.id)
      if (!(await isAdmin(chatId))) return res.status(200).json({ ok: true })

      await telegram('answerCallbackQuery', { callback_query_id: callback.id })
      if (!isAdminStorageReady()) {
        await telegram('sendMessage', {
          chat_id: chatId,
          text: 'Хранилище администраторов ещё не подключено. Обратитесь к владельцу сайта.',
        })
        return res.status(200).json({ ok: true })
      }

      await telegram('sendMessage', {
        chat_id: chatId,
        text: 'ADMIN_ADD_ID_REQUEST\nПришлите ID нового администратора ответом на это сообщение. Новый администратор сначала должен написать боту /start.',
        reply_markup: { force_reply: true, selective: true },
      })
      return res.status(200).json({ ok: true })
    }

    const message = update.message
    if (!message) return res.status(200).json({ ok: true })
    const chatId = String(message.chat.id)
    if (!(await isAdmin(chatId))) return res.status(200).json({ ok: true })

    if (/^\/(?:admin|start)(?:@\w+)?$/.test(text(message.text))) {
      await showAdminMenu(chatId)
      return res.status(200).json({ ok: true })
    }

    if (isAdminIdRequest(message)) {
      const newAdminId = text(message.text)
      if (!/^-?\d+$/.test(newAdminId)) {
        await telegram('sendMessage', { chat_id: chatId, text: 'Нужен цифровой Telegram ID. Попробуйте ещё раз, ответив на запрос.' })
        return res.status(200).json({ ok: true })
      }

      await addAdmin(newAdminId)
      await telegram('sendMessage', { chat_id: chatId, text: `Готово. ID ${newAdminId} добавлен в администраторы.` })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Could not handle Telegram update:', error)
    return res.status(500).json({ error: 'Could not handle Telegram update' })
  }
}
