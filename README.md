# Artemida Group: growth marketing agency website

React/Vite multi-page site (PL/RU/EN) with a contact form that forwards enquiries to Telegram.

## Local launch

```bash
pnpm install
pnpm dev
```

## Telegram applications

Copy `.env.example` to `.env` and fill in the values:

- `TELEGRAM_BOT_TOKEN` — bot token;
- `TELEGRAM_CHAT_ID` — primary administrator or group;
- `TELEGRAM_CHAT_IDS` — optional additional administrator IDs, separated by commas.

Never commit `.env` or bot tokens to GitHub.

## Deployment on Vercel

1. Import this GitHub repository into Vercel.
2. Add the same variables in **Project Settings → Environment Variables** for Production.
3. Deploy the project. Vercel detects the configuration in `vercel.json`.

The contact form sends: name, email, company website, service, preferred channel and handle, message, language and page URL.

## Legal compliance (Poland)

- Company details: fill in `src/config/company.ts` (NIP, REGON, KRS, registry court, share capital). They appear in the footer and in the legal documents.
- Legal pages: `/polityka-prywatnosci`, `/polityka-cookies`, `/regulamin` (PL binding, RU/EN translations) in `src/legal/content.ts`.
- Cookie consent: `src/consent.ts` and `src/components/CookieBanner.tsx`. Google Analytics / Meta Pixel load only after consent; set `VITE_GA_ID` / `VITE_META_PIXEL_ID` in Vercel to enable them. Do not use the Figma `analytics.googleAnalyticsId` setting: it loads GA without consent.
- Fonts are self-hosted in `public/fonts` (no Google Fonts requests).
- When the legal texts change, update `LEGAL_UPDATED`; when cookie categories change, bump `CONSENT_VERSION`.
