# artemidagroup.eu

Strona agencji Artemida Group w trzech językach (PL, RU, EN) oraz formularz kontaktowy, który przekazuje zapytania do Telegrama.

## Struktura

| Folder | Co zawiera |
|---|---|
| `site/` | Gotowa strona, która trafia na hosting (HTML, CSS, JS, fonty, obrazy OG, sitemap, robots, `_headers`). |
| `site-src/` | Generator strony: treści w `content_pl.py`, `content_ru.py`, `content_en.py`, teksty prawne w `legal.py`, wygląd w `static/site.css`, skrypty w `static/site.js`. |
| `functions/api/applications.ts` | Cloudflare Pages Function: `POST /api/applications` wysyła zapytanie do Telegrama. |
| `api/`, `vercel.json` | Stara wersja na Vercel, nieużywana przez Cloudflare. |

## Hosting

Cloudflare Pages, projekt `artemida-group`, gałąź `main`. Build command `pnpm build` kopiuje `site/` do `dist/`. Każdy push na `main` publikuje stronę.

Zmienne w Cloudflare (Settings → Variables and Secrets): `TELEGRAM_BOT_TOKEN` (Secret), opcjonalnie `TELEGRAM_CHAT_ID` i `TELEGRAM_CHAT_IDS`.

## Jak zmienić treść

```bash
cd site-src
# edytuj content_*.py lub legal.py
python3 og.py        # tylko gdy zmieniają się tytuły stron (obrazy OG, wymaga playwright)
python3 build.py     # buduje site-src/dist
python3 check.py     # audyt SEO: linki, hreflang, canonical, JSON-LD, tytuły
cd .. && rm -rf site && cp -R site-src/dist site
git add -A && git commit -m "..." && git push
```

## Analityka

W `site/assets/site.*.js` (źródło: `site-src/static/site.js`) na górze są stałe `GA_ID` i `PIXEL_ID`. Po wpisaniu identyfikatorów baner zgody włącza się automatycznie, a GA4 i Meta Pixel ładują się dopiero po zgodzie. Po włączeniu zaktualizuj rozdział 3 w polityce cookies (`legal.py`).

## SEO

- Polskie adresy bez zmian względem poprzedniej wersji, wersje `/ru/` i `/en/` z pełnym hreflang.
- Każda strona: unikalny title i description, canonical, Open Graph z własnym obrazem, JSON-LD (ProfessionalService, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Person).
- `sitemap.xml` z alternatywami językowymi, strony 404 w trzech językach (noindex).

> Uwaga: nie publikuj już strony z Figma Make, bo nadpisze nową wersję starą.
