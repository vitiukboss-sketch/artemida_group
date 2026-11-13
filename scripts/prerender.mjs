// Po zbudowaniu: zapisuje każdą stronę jako gotowy HTML (treść + tytuł, opis, canonical, dane strukturalne).
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const routes = ['/', '/uslugi', '/produkcja', '/portfolio', '/cennik', '/o-nas', '/kontakt', '/polityka-prywatnosci', '/polityka-cookies', '/regulamin']

function page(route, { html, seo, siteUrl, jsonLd }, status) {
  let out = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  // usuń domyślne znaczniki z szablonu, wstawimy własne dla tej strony
  out = out
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[^>]*>/, '')
    .replace(/\s*<meta property="og:title"[^>]*>/, '')
    .replace(/\s*<meta property="og:description"[^>]*>/, '')
  const url = siteUrl + (route === '/' ? '/' : route)
  const head = status === 404
    ? [`<title>Nie ma takiej strony · Artemida Group</title>`, `<meta name="robots" content="noindex">`]
    : [
        `<title>${esc(seo.title)}</title>`,
        `<meta name="description" content="${esc(seo.description)}">`,
        `<link rel="canonical" href="${url}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:site_name" content="Artemida Group">`,
        `<meta property="og:locale" content="pl_PL">`,
        `<meta property="og:url" content="${url}">`,
        `<meta property="og:title" content="${esc(seo.title)}">`,
        `<meta property="og:description" content="${esc(seo.description)}">`,
        `<meta property="og:image" content="${siteUrl}/brand/ag-mark.png">`,
        `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
      ]
  return out.replace('</head>', `    ${head.join('\n    ')}\n  </head>`)
}

for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  fs.writeFileSync(path.join(dist, file), page(route, render(route), 200))
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404', render('/nie-ma-takiej-strony'), 404))
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${routes.length} pages + 404.html`)
