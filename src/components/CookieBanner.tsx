import { useEffect, useRef, useState } from 'react'
import { closeCookieSettings, saveConsent, useConsent } from '../consent'
import type { Dictionary } from '../i18n'
import { DOC_PATHS } from '../legal/content'
import { Link } from '../router'

/**
 * Baner zgody: „Akceptuję” i „Odrzucam” mają taką samą wagę wizualną (wytyczne UODO / EROD 03/2022),
 * nic opcjonalnego nie działa przed wyborem, a ustawienia można otworzyć ponownie ze stopki.
 */
export function CookieBanner({ t }: { t: Dictionary }) {
  const { consent, isSettingsOpen } = useConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false)
  const [marketing, setMarketing] = useState(consent?.marketing ?? false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const visible = !consent || isSettingsOpen
  const expanded = showDetails || isSettingsOpen

  useEffect(() => {
    if (isSettingsOpen) {
      setAnalytics(consent?.analytics ?? false)
      setMarketing(consent?.marketing ?? false)
      dialogRef.current?.focus()
    }
  }, [isSettingsOpen, consent])

  useEffect(() => {
    if (!isSettingsOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && consent && closeCookieSettings()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isSettingsOpen, consent])

  if (!visible) return null
  const c = t.cookies

  return (
    <div className="cookie-wrap" data-modal={isSettingsOpen ? 'true' : undefined}>
      <div ref={dialogRef} tabIndex={-1} className="cookie" role="dialog" aria-modal={isSettingsOpen} aria-labelledby="cookie-title">
        <div className="cookie__head">
          <p id="cookie-title" className="cookie__title">{expanded ? c.settingsTitle : c.title}</p>
          {isSettingsOpen && consent && (
            <button type="button" className="cookie__close" onClick={closeCookieSettings} aria-label={c.close}>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          )}
        </div>
        <p className="cookie__text">
          {c.text}{' '}
          <Link to={DOC_PATHS.cookies} className="link">{c.more}</Link>
        </p>

        {expanded && (
          <ul className="cookie__list">
            <CookieRow title={c.categories.necessary.title} text={c.categories.necessary.text} checked disabled note={c.always} />
            <CookieRow title={c.categories.analytics.title} text={c.categories.analytics.text} checked={analytics} onChange={setAnalytics} />
            <CookieRow title={c.categories.marketing.title} text={c.categories.marketing.text} checked={marketing} onChange={setMarketing} />
          </ul>
        )}

        <div className="cookie__actions">
          <button type="button" className="btn btn--outline-light" onClick={() => saveConsent({ analytics: false, marketing: false })}>{c.reject}</button>
          <button type="button" className="btn btn--outline-light" onClick={() => saveConsent({ analytics: true, marketing: true })}>{c.accept}</button>
          {expanded ? (
            <button type="button" className="btn btn--text-light" onClick={() => saveConsent({ analytics, marketing })}>{c.save}</button>
          ) : (
            <button type="button" className="btn btn--text-light" onClick={() => setShowDetails(true)}>{c.settings}</button>
          )}
        </div>
      </div>
    </div>
  )
}

function CookieRow(props: { title: string; text: string; checked: boolean; disabled?: boolean; note?: string; onChange?: (value: boolean) => void }) {
  const id = `cookie-${props.title}`
  return (
    <li className="cookie__row">
      <div>
        <label htmlFor={id} className="cookie__row-title">{props.title}</label>
        <p className="cookie__row-text">{props.text}</p>
      </div>
      <div className="cookie__toggle-wrap">
        {props.note && <span className="cookie__note">{props.note}</span>}
        <input
          id={id}
          type="checkbox"
          role="switch"
          className="switch"
          checked={props.checked}
          disabled={props.disabled}
          onChange={event => props.onChange?.(event.target.checked)}
        />
      </div>
    </li>
  )
}
