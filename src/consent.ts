import { useSyncExternalStore } from 'react'
import { CONSENT_VERSION } from './config/company'

/**
 * Zgody na cookies zgodnie z art. 399 ustawy Prawo komunikacji elektronicznej i RODO:
 * - niezbędne pliki działają zawsze,
 * - analityczne i marketingowe uruchamiają się dopiero po wyraźnej zgodzie,
 * - zgodę można w każdej chwili zmienić lub wycofać (link „Ustawienia cookies” w stopce).
 *
 * Skrypty zewnętrzne są wyłączone, dopóki nie ustawisz zmiennych środowiskowych:
 *   VITE_GA_ID=G-XXXXXXX           (Google Analytics 4)
 *   VITE_META_PIXEL_ID=1234567890  (Meta Pixel)
 */
export type Consent = {
  version: number
  analytics: boolean
  marketing: boolean
  /** Data udzielenia zgody (ISO), przechowywana jako dowód zgody. */
  date: string
}

const STORAGE_KEY = 'artemida_consent'
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000
const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim() || ''
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || ''

export const HAS_ANALYTICS = Boolean(GA_ID)
export const HAS_MARKETING = Boolean(PIXEL_ID)

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Consent
    if (parsed.version !== CONSENT_VERSION) return null
    // Po 12 miesiącach prosimy o ponowne potwierdzenie wyboru.
    if (Date.now() - new Date(parsed.date).getTime() > CONSENT_MAX_AGE_MS) return null
    return parsed
  } catch {
    return null
  }
}

let current: Consent | null = typeof window === 'undefined' ? null : read()
let settingsOpen = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach(listener => listener())

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const previous = current
  current = { version: CONSENT_VERSION, analytics: choice.analytics, marketing: choice.marketing, date: new Date().toISOString() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    /* Prywatny tryb przeglądarki: zgoda obowiązuje do końca wizyty. */
  }
  settingsOpen = false
  applyConsent(current)
  emit()

  // Wycofanie zgody: usuwamy cookies i przeładowujemy stronę, żeby skrypty przestały działać.
  const revoked = (previous?.analytics && !current.analytics) || (previous?.marketing && !current.marketing)
  if (revoked) {
    removeTrackingCookies()
    window.location.reload()
  }
}

export function openCookieSettings() {
  settingsOpen = true
  emit()
}

export function closeCookieSettings() {
  settingsOpen = false
  emit()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, () => current, () => null)
  const isSettingsOpen = useSyncExternalStore(subscribe, () => settingsOpen, () => false)
  return { consent, isSettingsOpen }
}

/* ------------------------------------------------------------------ */
/* Ładowanie skryptów wyłącznie po zgodzie                            */
/* ------------------------------------------------------------------ */

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...args: unknown[]) => void; push?: unknown }
    _fbq?: unknown
  }
}

let gaLoaded = false
let pixelLoaded = false

function loadScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function applyConsent(consent: Consent | null) {
  if (!consent) return

  if (GA_ID && consent.analytics && !gaLoaded) {
    gaLoaded = true
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
    // Google Consent Mode v2: domyślnie wszystko odrzucone, potem tylko to, na co jest zgoda.
    window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' })
    window.gtag('consent', 'update', { analytics_storage: 'granted' })
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { anonymize_ip: true })
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`)
  }

  if (PIXEL_ID && consent.marketing && !pixelLoaded) {
    pixelLoaded = true
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue!.push(args)
    } as NonNullable<Window['fbq']>
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.push = fbq
    window.fbq = fbq
    window._fbq = fbq
    loadScript('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', PIXEL_ID)
    fbq('track', 'PageView')
  }
}

function removeTrackingCookies() {
  const domains = ['', window.location.hostname, `.${window.location.hostname.replace(/^www\./, '')}`]
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim()
    if (!/^(_ga|_gid|_gat|_fbp|_fbc)/.test(name)) return
    domains.forEach(domain => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    })
  })
}

/** Zgłoszenie z formularza jako konwersja (tylko gdy jest zgoda). */
export function trackLead() {
  if (current?.analytics && window.gtag) window.gtag('event', 'generate_lead')
  if (current?.marketing && window.fbq) window.fbq('track', 'Lead')
}

if (typeof window !== 'undefined') applyConsent(current)
