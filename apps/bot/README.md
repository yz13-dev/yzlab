# Telegram Bot for Index Requests

This Telegram bot allows you to manage index requests from the database. It can only respond to a specific authorized chat ID for security.

## Features

- View pending index requests
- Accept or reject requests with inline keyboard buttons
- Restricted access to authorized chat ID only
- Real-time status updates

## Environment Variables

Create a `.env.local` file in the bot directory with the following variables:

```env
# Telegram Bot Configuration
BOT_TOKEN=your_telegram_bot_token_here
AUTHORIZED_CHAT_ID=your_authorized_chat_id_here
```

The API_BASE_URL is hardcoded to `https://api.yzlab.ru` in the bot code.

### Getting the Chat ID

To get your chat ID:
1. Start a conversation with your bot
2. Send `/chatid` to the bot (temporary command for setup)
3. The bot will reply with your chat ID
4. Set this ID in the `AUTHORIZED_CHAT_ID` environment variable
5. Remove the `/chatid` command from the code after setup

## Commands

- `/start` - Initialize the bot and show available commands (only for authorized users)
- `/requests` - Show all pending index requests with accept/reject buttons
- `/chatid` - Get your chat ID (temporary, remove after setup)

## Usage

1. Set up the environment variables
2. Deploy the bot
3. Send `/start` to initialize
4. Use `/requests` to view and manage index requests
5. Click the inline buttons to accept or reject requests

## Security

The bot will only respond to messages from the chat ID specified in `AUTHORIZED_CHAT_ID`. All other messages will be ignored and logged. Unauthorized users will see no bot commands in their Telegram interface.

## Troubleshooting

If you encounter import issues:
- Make sure all dependencies are installed: `bun install`
- The bot uses direct API calls instead of package imports
- Check that your API is accessible at `https://api.yzlab.ru` 