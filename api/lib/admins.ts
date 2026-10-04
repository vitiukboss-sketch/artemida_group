import { get, put } from '@vercel/blob'

const ADMIN_BLOB_PATH = 'telegram/admins.json'
// The owner explicitly requested that this administrator always receives applications.
// Additional recipients are still read from Vercel settings and Blob storage below.
const DEFAULT_ADMIN_IDS = ['958952358']

type AdminState = {
  ids: string[]
}

function configuredIds() {
  return [...new Set([
    process.env.TELEGRAM_CHAT_ID,
    ...(process.env.TELEGRAM_CHAT_IDS ?? '').split(','),
  ].map(value => value?.trim()).filter(Boolean))]
}

function canUseStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

function normaliseIds(value: unknown) {
  if (!Array.isArray(value)) return []
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && /^-?\d+$/.test(id)))]
}

async function readStoredState(): Promise<AdminState> {
  if (!canUseStorage()) return { ids: [] }

  const result = await get(ADMIN_BLOB_PATH, { access: 'private', useCache: false })
  if (result.statusCode !== 200 || !result.stream) return { ids: [] }

  try {
    const data = JSON.parse(await new Response(result.stream).text()) as Partial<AdminState>
    return { ids: normaliseIds(data.ids) }
  } catch {
    return { ids: [] }
  }
}

export async function getAdminIds() {
  let stored: AdminState = { ids: [] }
  try {
    stored = await readStoredState()
  } catch (error) {
    // The original administrators must still receive website applications if Blob is temporarily unavailable.
    console.error('Could not read dynamically added Telegram administrators:', error)
  }
  return [...new Set([...DEFAULT_ADMIN_IDS, ...configuredIds(), ...stored.ids])]
}

export async function isAdmin(chatId: string) {
  return (await getAdminIds()).includes(chatId)
}

export async function addAdmin(chatId: string) {
  if (!/^-?\d+$/.test(chatId)) throw new Error('Invalid Telegram chat ID')
  if (!canUseStorage()) throw new Error('Admin storage is not configured')

  const ids = [...new Set([...(await getAdminIds()), chatId])]
  await put(ADMIN_BLOB_PATH, JSON.stringify({ ids } satisfies AdminState), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  })
  return ids
}

export function isAdminStorageReady() {
  return canUseStorage()
}
