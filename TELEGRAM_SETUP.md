# Telegram applications setup

The form sends applications to `POST /api/applications`. The server forwards the full application to Telegram and keeps the bot token out of the visitor's browser.

1. Start a chat with the bot and send it `/start`, or add the bot to the group where applications should arrive.
2. Get the destination chat ID by opening `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` after sending that message. In the response, copy `message.chat.id` (group IDs are usually negative).
3. Copy `.env.example` to `.env` and set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
4. Run the site. Submit a test application and confirm it arrives in Telegram.

For a production deployment, configure the same two environment variables in the hosting provider and expose the `/api/applications` server route there. A static-only host cannot safely send to a bot because it would reveal the token to every visitor.
