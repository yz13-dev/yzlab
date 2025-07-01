import { acceptRequest, createRequest, getRequests, rejectRequest } from "@/lib/api";
import { hydrate, HydrateFlavor } from "@grammyjs/hydrate";
import { Bot, Context, InlineKeyboard, InputFile } from "grammy";
// import { acceptRequest, createRequest, getRequests, rejectRequest } from "@yzlab/api";

type BotContext = HydrateFlavor<Context>;
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
const AUTHORIZED_CHAT_ID = process.env.AUTHORIZED_CHAT_ID;

console.log("Bot starting...");
console.log("BOT_TOKEN exists:", !!BOT_TOKEN);
console.log("AUTHORIZED_CHAT_ID:", AUTHORIZED_CHAT_ID);
console.log("API functions imported:", { getRequests: !!getRequests, acceptRequest: !!acceptRequest, rejectRequest: !!rejectRequest, createRequest: !!createRequest });

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.use(hydrate());

// Middleware to check if the chat is authorized (only for non-command messages)
bot.use(async (ctx, next) => {
  console.log("Middleware called for message:", ctx.message?.text);

  // Skip authorization check for commands
  if (ctx.message?.text?.startsWith('/')) {
    console.log("Command detected, skipping authorization check");
    await next();
    return;
  }

  if (!AUTHORIZED_CHAT_ID) {
    console.warn("AUTHORIZED_CHAT_ID not set in environment variables");
    return;
  }

  if (ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
    console.log(`Unauthorized access attempt from chat ID: ${ctx.chat?.id}`);
    return;
  }

  console.log("Authorization passed for non-command message");
  await next();
});

// ===== COMMANDS =====

bot.command("start", async (ctx) => {
  console.log("=== START COMMAND EXECUTED ===");
  console.log("Start command called by chat ID:", ctx.chat?.id);

  // Check if this is the authorized chat
  if (AUTHORIZED_CHAT_ID && ctx.chat?.id.toString() === AUTHORIZED_CHAT_ID) {
    console.log("Setting admin commands for authorized user");
    // Authorized user - show admin commands
    await bot.api.setMyCommands([
      {
        command: "requests",
        description: "Показать запросы на индексацию",
      },
      {
        command: "preview",
        description: "Предпросмотр ссылки",
      },
    ]);

    await ctx.reply("Привет! Используй /requests для просмотра запросов или просто отправь мне ссылку для предпросмотра.");
  } else {
    console.log("Setting public commands for unauthorized user");
    // Unauthorized user - show only public commands
    await bot.api.setMyCommands([
      {
        command: "preview",
        description: "Предпросмотр ссылки",
      },
    ]);

    await ctx.reply("Привет! Просто отправь мне ссылку для предпросмотра и запроса индексации.");
  }
});

// Command for previewing links (available to all users)
bot.command("preview", async (ctx) => {
  console.log("=== PREVIEW COMMAND EXECUTED ===");
  const message = `🔍 <b>Предпросмотр ссылки</b>\n\n` +
    `Просто отправь мне ссылку, и я покажу предпросмотр!\n\n` +
    `Примеры:\n` +
    `• https://example.com\n` +
    `• https://github.com\n` +
    `• Любая другая ссылка`;

  await ctx.reply(message, {
    parse_mode: "HTML",
  });
});

// Debug command to check bot state
bot.command("debug", async (ctx) => {
  console.log("=== DEBUG COMMAND EXECUTED ===");
  console.log("Debug command called");
  await ctx.reply(`🔍 <b>Debug Info</b>\n\n` +
    `Chat ID: ${ctx.chat?.id}\n` +
    `Authorized Chat ID: ${AUTHORIZED_CHAT_ID}\n` +
    `Is Authorized: ${ctx.chat?.id.toString() === AUTHORIZED_CHAT_ID}\n` +
    `Bot Token: ${BOT_TOKEN ? "Set" : "Not set"}\n` +
    `API Functions: ${typeof getRequests === 'function' ? "Loaded" : "Not loaded"}`, {
    parse_mode: "HTML"
  });
});

// Temporary command to get chat ID - remove this after setup
bot.command("chatid", async (ctx) => {
  await ctx.reply(`Your Chat ID is: ${ctx.chat?.id}`);
});

bot.command("requests", async (ctx) => {
  console.log("=== REQUESTS COMMAND EXECUTED ===");
  console.log("Requests command called by chat ID:", ctx.chat?.id);
  console.log("AUTHORIZED_CHAT_ID:", AUTHORIZED_CHAT_ID);

  try {
    // Check authorization before processing
    if (!AUTHORIZED_CHAT_ID || ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
      console.log(`Unauthorized access attempt from chat ID: ${ctx.chat?.id}`);
      await ctx.reply("❌ У вас нет доступа к этой команде.");
      return;
    }

    console.log("Authorization passed, fetching requests...");

    const requests = await getRequests();

    console.log("requests", requests);

    if (!requests || requests.length === 0) {
      await ctx.reply("Нет активных запросов на индексацию.");
      return;
    }

    await ctx.reply(`Найдено ${requests.length} запросов на индексацию:`);

    for (const request of requests) {
      const url = new URL(request.url);
      const domain = url.hostname;
      const title = request.name || "Не указано";
      const description = request.description || "Не указано";
      const email = request.email || "Не указано";
      const type = request.type;
      const created_at = request.created_at ? new Date(request.created_at).toLocaleString('ru-RU') : '';

      const message = `🌐 <b>${domain}</b>\n` +
        `📝 <b>Название:</b> ${title}\n` +
        `📄 <b>Описание:</b> ${description}\n` +
        `📧 <b>Email:</b> ${email}\n` +
        `🔗 <b>URL:</b> ${request.url}\n` +
        `📋 <b>Тип:</b> ${type}\n` +
        `${created_at ? `📅 <b>Создан:</b> ${created_at}` : ''}`;

      const keyboard = new InlineKeyboard()
        .text("✅ Принять", `accept_${request.id}`)
        .text("❌ Отклонить", `reject_${request.id}`);

      await ctx.reply(message, {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
    }
  } catch (error) {
    console.error("Error in requests command:", error);
    await ctx.reply("❌ Ошибка при получении запросов. Попробуйте позже.");
  }
});

// ===== MESSAGE HANDLERS =====

// Handle accepted/rejected status buttons (no action needed)
bot.callbackQuery(/^(accepted|rejected)$/, async (ctx) => {
  // Check authorization before processing
  if (!AUTHORIZED_CHAT_ID || ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
    console.log(`Unauthorized callback attempt from chat ID: ${ctx.chat?.id}`);
    return;
  }

  await ctx.answerCallbackQuery("Действие уже выполнено.");
});

// Handle URL messages (when users just send a link)
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  // Skip if it's a command
  if (text.startsWith('/')) {
    return;
  }

  // Try to extract URL from the message
  const urlMatch = text.match(/https?:\/\/[^\s]+/);
  if (!urlMatch) {
    return; // Not a URL, ignore
  }

  const url = urlMatch[0];

  // Validate URL
  try {
    new URL(url);
  } catch {
    await ctx.reply("❌ Неверный URL. Пожалуйста, укажите корректную ссылку.");
    return;
  }

  try {
    // Send loading message first
    const loadingMessage = await ctx.reply("🔍 <b>Получаю предпросмотр...</b>\n\n⏳ Пожалуйста, подождите...", {
      parse_mode: "HTML",
    });

    // Get preview data from API
    const response = await fetch(`https://api.yzlab.ru/v1/indexing/preview?url=${encodeURIComponent(url)}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error('Failed to get preview');
    }

    const preview = await response.json();

    // Create preview message
    const domain = new URL(url).hostname;
    const title = preview.title || "Название не найдено";
    const description = preview.description || "Описание не найдено";
    const ogImage = preview.og;
    const screenshot = preview.screenshot;

    let message = `🔍 <b>Предпросмотр</b>\n\n` +
      `🌐 <b>Домен:</b> ${domain}\n` +
      `📝 <b>Название:</b> ${title}\n` +
      `📄 <b>Описание:</b> ${description}\n` +
      `🔗 <b>URL:</b> ${url}`;

    // Determine what indexing options are available
    const hasBasicMetadata = title !== "Название не найдено" || description !== "Описание не найдено";
    const hasOgImage = !!ogImage;
    const hasScreenshot = !!screenshot;

    // Create keyboard with indexing options based on available data
    const keyboard = new InlineKeyboard();

    // Full indexing - available if we have basic metadata (title/description)
    // Full indexing will generate both screenshot and OG even if they don't exist initially
    if (hasBasicMetadata) {
      keyboard.text("📋 Полная индексация", `request_full_${encodeURIComponent(url)}`);
    }

    // Screenshot indexing - only if screenshot already exists
    if (hasScreenshot) {
      if (hasBasicMetadata) {
        keyboard.row();
      }
      keyboard.text("🖼 Только скриншот", `request_site_${encodeURIComponent(url)}`);
    }

    // OG indexing - only if OG image already exists
    if (hasOgImage) {
      if (hasBasicMetadata || hasScreenshot) {
        keyboard.row();
      }
      keyboard.text("📄 Только OG", `request_og_${encodeURIComponent(url)}`);
    }

    // If no indexing options are available, show a message
    if (!hasBasicMetadata && !hasScreenshot && !hasOgImage) {
      message += `\n\n⚠️ <b>Недостаточно данных для индексации</b>\n` +
        `Сайт не содержит необходимых метаданных или изображений.`;

      // Edit the loading message with the result
      await ctx.api.editMessageText(ctx.chat.id, loadingMessage.message_id, message, {
        parse_mode: "HTML",
      });
      return;
    }

    // Send images if available
    if (screenshot) {
      try {
        // Convert base64 to buffer and create InputFile
        const screenshotBuffer = Buffer.from(screenshot, 'base64');
        const inputFile = new InputFile(screenshotBuffer, "screenshot.jpg");
        await ctx.replyWithPhoto(inputFile, {
          caption: `📸 <b>Скриншот</b>\n${domain}`,
          parse_mode: "HTML"
        });
      } catch (error) {
        console.error("Error sending screenshot:", error);
      }
    }

    if (false) {
      try {
        await ctx.replyWithPhoto(ogImage, {
          caption: `🖼 <b>OG изображение</b>\n${domain}`,
          parse_mode: "HTML"
        });
      } catch (error) {
        console.error("Error sending OG image:", error);
      }
    }

    // Edit the loading message with the final result
    await ctx.api.editMessageText(ctx.chat.id, loadingMessage.message_id, message, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });

  } catch (error) {
    console.error("Error getting preview:", error);
    await ctx.reply("❌ Ошибка при получении предпросмотра. Проверьте ссылку и попробуйте снова.");
  }
});

// Handle indexing request buttons
bot.callbackQuery(/^request_(full|site|og)_(.+)$/, async (ctx) => {
  const type = ctx.match?.[1];
  const url = decodeURIComponent(ctx.match?.[2] || '');

  if (!url || !type) {
    await ctx.answerCallbackQuery("❌ Ошибка: неверные параметры");
    return;
  }

  try {
    // Create request using the API wrapper
    await createRequest({
      url,
      type,
      name: `Запрос от ${ctx.from?.first_name || 'пользователя'}`,
      description: `Запрос отправлен через Telegram бота`,
      email: null,
    });

    await ctx.answerCallbackQuery("✅ Запрос отправлен!");

    // Update the message to show request was sent
    const keyboard = new InlineKeyboard().text("✅ Запрос отправлен", "request_sent");
    await ctx.editMessageReplyMarkup({ reply_markup: keyboard });

    // Send confirmation message
    await ctx.reply(`✅ <b>Запрос на индексацию отправлен!</b>\n\n` +
      `🌐 <b>URL:</b> ${url}\n` +
      `📋 <b>Тип:</b> ${type === 'full' ? 'Полная индексация' : type === 'site' ? 'Только скриншот' : 'Только OG'}\n` +
      `📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
      `Ваш запрос будет рассмотрен в ближайшее время.`, {
      parse_mode: "HTML"
    });

  } catch (error) {
    console.error("Error creating request:", error);
    await ctx.answerCallbackQuery("❌ Ошибка при отправке запроса");
    await ctx.reply("❌ Ошибка при отправке запроса. Попробуйте позже.");
  }
});

// Handle request sent button (no action needed)
bot.callbackQuery("request_sent", async (ctx) => {
  await ctx.answerCallbackQuery("Запрос уже отправлен");
});

// Handle accept button clicks
bot.callbackQuery(/^accept_(\d+)$/, async (ctx) => {
  // Check authorization before processing
  if (!AUTHORIZED_CHAT_ID || ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
    console.log(`Unauthorized callback attempt from chat ID: ${ctx.chat?.id}`);
    return;
  }

  const requestId = ctx.match?.[1];

  if (!requestId) {
    await ctx.answerCallbackQuery("❌ Ошибка: ID запроса не найден");
    return;
  }

  try {
    await acceptRequest(requestId);
    await ctx.answerCallbackQuery("✅ Запрос принят!");

    // Update the message to show it was accepted
    const keyboard = new InlineKeyboard().text("✅ Принято", "accepted");
    await ctx.editMessageReplyMarkup({ reply_markup: keyboard });
  } catch (error) {
    console.error("Error accepting request:", error);
    await ctx.answerCallbackQuery("❌ Ошибка при принятии запроса.");
  }
});

// Handle reject button clicks
bot.callbackQuery(/^reject_(\d+)$/, async (ctx) => {
  // Check authorization before processing
  if (!AUTHORIZED_CHAT_ID || ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
    console.log(`Unauthorized callback attempt from chat ID: ${ctx.chat?.id}`);
    return;
  }

  const requestId = ctx.match?.[1];

  if (!requestId) {
    await ctx.answerCallbackQuery("❌ Ошибка: ID запроса не найден");
    return;
  }

  try {
    await rejectRequest(requestId);
    await ctx.answerCallbackQuery("❌ Запрос отклонен!");

    // Update the message to show it was rejected
    const keyboard = new InlineKeyboard().text("❌ Отклонено", "rejected");
    await ctx.editMessageReplyMarkup({ reply_markup: keyboard });
  } catch (error) {
    console.error("Error rejecting request:", error);
    await ctx.answerCallbackQuery("❌ Ошибка при отклонении запроса.");
  }
});

// Handle all messages for debugging (must be at the very end)
bot.on("message", async (ctx) => {
  console.log("Received message:", ctx.message?.text);
  console.log("From chat ID:", ctx.chat?.id);
  console.log("Message type:", ctx.message?.text ? "text" : "other");
});
