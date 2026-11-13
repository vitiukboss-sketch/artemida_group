import { renderToString } from 'react-dom/server'
import App from './App'
import { setServerPath } from './router'
import { SEO, SITE_URL, organizationJsonLd } from './seo'

/** Renderuje stronę do HTML na etapie budowania (prerendering dla wyszukiwarek). */
export function render(path: string) {
  setServerPath(path)
  return { html: renderToString(<App />), seo: SEO[path], siteUrl: SITE_URL, jsonLd: organizationJsonLd() }
}
