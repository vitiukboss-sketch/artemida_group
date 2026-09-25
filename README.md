# Artemida Group landing page

React/Vite landing page with a Telegram application form.

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

The application form sends the full request: name, phone, role, platform, messenger, comment, language, submission time, and page URL.
