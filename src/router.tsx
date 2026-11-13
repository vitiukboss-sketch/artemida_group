import { useSyncExternalStore, type AnchorHTMLAttributes } from 'react'

/** Minimalny router oparty na History API (bez dodatkowych zależności). */
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.hash) return
  window.history.pushState(null, '', to)
  listeners.forEach(listener => listener())
  const [, hash] = to.split('#')
  if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

// Ścieżka używana przy prerenderingu stron do statycznego HTML (build).
let serverPath = '/'
export function setServerPath(path: string) {
  serverPath = path
}

export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname, () => serverPath)
}

export function Link({ to, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return (
    <a
      href={to}
      onClick={event => {
        onClick?.(event)
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        navigate(to)
      }}
      {...rest}
    />
  )
}
