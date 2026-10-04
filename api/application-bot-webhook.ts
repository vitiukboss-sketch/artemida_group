import { del, get, put } from '@vercel/blob'
import { notifyAdmins } from './lib/application-notifier.js'

type TelegramUser = { id: number; username?: string; first_name?: string }
type TelegramMessage = { chat: { id: number }; from?: TelegramUser; text?: string }
type TelegramUpdate = { message?: TelegramMessage; callback_query?: { id: string; from: TelegramUser; message?: TelegramMessage; data?: string } }
type RequestLike = { method?: string; body?: TelegramUpdate; headers?: Record<string, string | string[] | undefined> }
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void; setHeader: (name: string, value: string) => void }

type Step = 'role' | 'platform' | 'name' | 'phone' | 'messenger' | 'comment'
type ApplicationSession = {
  step: Step; role?: 'taxi' | 'courier'; platform?: string; name?: string; phone?: string; messenger?: string; user?: TelegramUser
}

const sessionPath = (chatId: string) => `telegram/application-sessions/${chatId}.json`
const roleNames = { taxi: 'Таксист', courier: 'Курьер' }

function requestHeader(req: RequestLike, key: string) {
  const value = req.headers?.[key] ?? req.headers?.[key.toLowerCase()]
  return Array.isArray(value) ? value[0] : value
}

function text(value: unknown) { return typeof value === 'string' ? value.trim() : '' }

function sourceToken() {
  const token = process.env.APPLICATION_BOT_TOKEN
  if (!token) throw new Error('Application bot token is missing')
  return token
}

async function telegram(method: string, body: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${sourceToken()}/${method}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Application bot returned ${response.status}`)
}

async function saveSession(chatId: string, session: ApplicationSession) {
  await put(sessionPath(chatId), JSON.stringify(session), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' })
}

async function loadSession(chatId: string): Promise<ApplicationSession | null> {
  const result = await get(sessionPath(chatId), { access: 'private' })
  if (result.statusCode !== 200 || !result.stream) return null
  try { return JSON.parse(await new Response(result.stream).text()) as ApplicationSession } catch { return null }
}

async function askRole(chatId: string, user?: TelegramUser) {
  await saveSession(chatId, { step: 'role', user })
  await telegram('sendMessage', {
    chat_id: chatId, text: 'Добро пожаловать! Заполним заявку по шагам.\n\n1/6. Выберите направление:',
    reply_markup: { inline_keyboard: [[
      { text: '🚕 Таксист', callback_data: 'application:role:taxi' },
      { text: '🛵 Курьер', callback_data: 'application:role:courier' },
    ]] },
  })
}

async function askPlatform(chatId: string, session: ApplicationSession) {
  const platforms = session.role === 'courier' ? ['Bolt', 'Uber', 'Glovo', 'Pyszne.pl'] : ['Bolt', 'Uber']
  await saveSession(chatId, { ...session, step: 'platform' })
  await telegram('sendMessage', {
    chat_id: chatId, text: '2/6. Выберите платформу:',
    // Keep the selected role in the button itself. It lets the questionnaire continue
    // even if a short-lived session read is delayed by storage.
    reply_markup: { inline_keyboard: platforms.map(platform => [{ text: platform, callback_data: `application:platform:${session.role}:${platform}` }]) },
  })
}

async function askName(chatId: string, session: ApplicationSession) {
  await saveSession(chatId, { ...session, step: 'name' })
  await telegram('sendMessage', { chat_id: chatId, text: '3/6. Как вас зовут? Напишите имя одним сообщением.' })
}

async function askPhone(chatId: string, session: ApplicationSession) {
  await saveSession(chatId, { ...session, step: 'phone' })
  await telegram('sendMessage', { chat_id: chatId, text: '4/6. Напишите номер телефона для связи.' })
}

async function askMessenger(chatId: string, session: ApplicationSession) {
  await saveSession(chatId, { ...session, step: 'messenger' })
  await telegram('sendMessage', {
    chat_id: chatId, text: '5/6. Выберите удобный мессенджер для связи:',
    reply_markup: { inline_keyboard: [[
      { text: 'WhatsApp', callback_data: 'application:messenger:WhatsApp' },
      { text: 'Telegram', callback_data: 'application:messenger:Telegram' },
      { text: 'Viber', callback_data: 'application:messenger:Viber' },
    ]] },
  })
}

async function askComment(chatId: string, session: ApplicationSession) {
  await saveSession(chatId, { ...session, step: 'comment' })
  await telegram('sendMessage', {
    chat_id: chatId, text: '6/6. Напишите комментарий или вопрос. Этот шаг можно пропустить.',
    reply_markup: { inline_keyboard: [[{ text: 'Пропустить', callback_data: 'application:skip-comment' }]] },
  })
}

async function complete(chatId: string, session: ApplicationSession, comment = '') {
  if (!session.role || !session.platform || !session.name || !session.phone || !session.messenger) return askRole(chatId, session.user)
  await notifyAdmins({
    source: 'bot', name: session.name, phone: session.phone, role: roleNames[session.role], platform: session.platform,
    messenger: session.messenger, comment,
    telegramUser: session.user ? { id: session.user.id, username: session.user.username, firstName: session.user.first_name } : undefined,
  })
  await del(sessionPath(chatId))
  await telegram('sendMessage', { chat_id: chatId, text: '✅ Заявка принята! Мы свяжемся с вами в ближайшее время.' })
}

/** Questionnaire bot. Completed applications are delivered through the administrator bot. */
export default async function applicationBotWebhook(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const secret = process.env.APPLICATION_BOT_WEBHOOK_SECRET
  if (!secret || requestHeader(req, 'x-telegram-bot-api-secret-token') !== secret) return res.status(401).json({ error: 'Unauthorized' })

  let replyChatId: string | undefined
  try {
    const update = req.body ?? {}
    const callback = update.callback_query
    if (callback?.message && callback.data?.startsWith('application:')) {
      const chatId = String(callback.message.chat.id)
      replyChatId = chatId
      const session = await loadSession(chatId)
      await telegram('answerCallbackQuery', { callback_query_id: callback.id })
      const [, action, ...values] = callback.data.split(':')
      const value = values[0]
      console.log('[application-bot] callback', { chatId, action, values, step: session?.step })
      if (action === 'role' && (value === 'taxi' || value === 'courier')) {
        await askPlatform(chatId, { ...(session ?? { step: 'role', user: callback.from }), role: value, user: session?.user ?? callback.from })
      } else if (action === 'platform') {
        const embeddedRole = values.length > 1 ? values[0] : undefined
        const role = embeddedRole === 'taxi' || embeddedRole === 'courier' ? embeddedRole : session?.role
        const platform = values.length > 1 ? values[1] : value
        const valid = Boolean(platform && role && ((role === 'courier' && ['Bolt', 'Uber', 'Glovo', 'Pyszne.pl'].includes(platform)) || (role === 'taxi' && ['Bolt', 'Uber'].includes(platform))))
        if (valid && role) await askName(chatId, { ...(session ?? { step: 'platform', user: callback.from }), role, platform, user: session?.user ?? callback.from })
        else await askRole(chatId, callback.from)
      } else if (action === 'messenger' && session && ['WhatsApp', 'Telegram', 'Viber'].includes(value)) {
        await askComment(chatId, { ...session, messenger: value })
      } else if (action === 'skip-comment' && session) {
        await complete(chatId, session)
      } else {
        await askRole(chatId, callback.from)
      }
      return res.status(200).json({ ok: true })
    }

    const message = update.message
    if (!message) return res.status(200).json({ ok: true })
    const chatId = String(message.chat.id)
    replyChatId = chatId
    const messageText = text(message.text)
    if (/^\/(?:start|restart)(?:@\w+)?$/i.test(messageText)) { await askRole(chatId, message.from); return res.status(200).json({ ok: true }) }
    const session = await loadSession(chatId)
    if (!session) { await askRole(chatId, message.from); return res.status(200).json({ ok: true }) }

    if (session.step === 'name') {
      if (messageText.length < 2 || messageText.length > 120) await telegram('sendMessage', { chat_id: chatId, text: 'Пожалуйста, напишите имя от 2 до 120 символов.' })
      else await askPhone(chatId, { ...session, name: messageText })
    } else if (session.step === 'phone') {
      const digits = messageText.replace(/\D/g, '')
      if (digits.length < 7 || digits.length > 15) await telegram('sendMessage', { chat_id: chatId, text: 'Проверьте номер: нужно от 7 до 15 цифр.' })
      else await askMessenger(chatId, { ...session, phone: messageText.slice(0, 60) })
    } else if (session.step === 'comment') {
      await complete(chatId, session, messageText.slice(0, 2000))
    } else {
      await telegram('sendMessage', { chat_id: chatId, text: 'Выберите вариант кнопкой выше или отправьте /start, чтобы начать заново.' })
    }
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Could not handle application-bot update:', error)
    if (replyChatId) {
      try {
        await telegram('sendMessage', {
          chat_id: replyChatId,
          text: 'Не удалось обработать этот шаг. Нажмите /start, чтобы продолжить с начала.',
        })
      } catch (notificationError) {
        console.error('Could not send application-bot recovery message:', notificationError)
      }
    }
    return res.status(500).json({ error: 'Could not handle application-bot update' })
  }
}
