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

### Getting the Chat ID

To get your chat ID:
1. Start a conversation with your bot
2. Send any message to the bot
3. Check the bot logs or use the Telegram API to get the chat ID
4. Set this ID in the `AUTHORIZED_CHAT_ID` environment variable

## Commands

- `/start` - Initialize the bot and show available commands
- `/requests` - Show all pending index requests with accept/reject buttons

## Usage

1. Set up the environment variables
2. Deploy the bot
3. Send `/start` to initialize
4. Use `/requests` to view and manage index requests
5. Click the inline buttons to accept or reject requests

## Security

The bot will only respond to messages from the chat ID specified in `AUTHORIZED_CHAT_ID`. All other messages will be ignored and logged. 