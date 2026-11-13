import { renderToString } from 'react-dom/server'
import App from './App'
import { setServerPath } from './router'
import { ROUTES, SEO, SITE_URL, faqJsonLd, organizationJsonLd } from './seo'

export { ROUTES }

/** Renderuje stronę do HTML na etapie budowania (prerendering dla wyszukiwarek). */
export function render(path: string) {
  setServerPath(path)
  return { html: renderToString(<App />), seo: SEO[path], siteUrl: SITE_URL, jsonLd: [organizationJsonLd(), faqJsonLd(path)].filter(Boolean) }
}
