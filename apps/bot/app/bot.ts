import { hydrate, HydrateFlavor } from "@grammyjs/hydrate";
import { Bot, Context, InlineKeyboard } from "grammy";
import { getRequests, acceptRequest, rejectRequest, createRequest } from "@/lib/api";

type BotContext = HydrateFlavor<Context>;
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
const AUTHORIZED_CHAT_ID = process.env.AUTHORIZED_CHAT_ID;

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.use(hydrate());

// Middleware to check if the chat is authorized
bot.use(async (ctx, next) => {
  if (!AUTHORIZED_CHAT_ID) {
    console.warn("AUTHORIZED_CHAT_ID not set in environment variables");
    return;
  }
  
  if (ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
    console.log(`Unauthorized access attempt from chat ID: ${ctx.chat?.id}`);
    return;
  }
  
  await next();
});

bot.command("start", async (ctx) => {
  // Check if this is the authorized chat
  if (AUTHORIZED_CHAT_ID && ctx.chat?.id.toString() === AUTHORIZED_CHAT_ID) {
    // Authorized user - show admin commands
    await bot.api.setMyCommands([
      {
        command: "requests",
        description: "Показать запросы на индексацию",
      },
      {
        command: "request",
        description: "Отправить запрос на индексацию",
      },
    ]);

    await ctx.reply("Привет! Используй /requests для просмотра запросов или /request для отправки нового запроса.");
  } else {
    // Unauthorized user - show only public commands
    await bot.api.setMyCommands([
      {
        command: "request",
        description: "Отправить запрос на индексацию",
      },
    ]);
    
    await ctx.reply("Привет! Используй /request для отправки запроса на индексацию сайта.");
  }
});

// Command for submitting index requests (available to all users)
bot.command("request", async (ctx) => {
  const message = `📝 <b>Отправка запроса на индексацию</b>\n\n` +
    `Отправьте мне сообщение в формате:\n` +
    `<code>/submit https://example.com</code>\n\n` +
    `<b>Типы индексации:</b>\n` +
    `• <code>/submit https://example.com full</code> - полная индексация\n` +
    `• <code>/submit https://example.com site</code> - только скриншот\n` +
    `• <code>/submit https://example.com og</code> - только OG метаданные`;

  await ctx.reply(message, {
    parse_mode: "HTML",
  });
});

// Command for submitting requests via bot
bot.command("submit", async (ctx) => {
  const args = ctx.message?.text?.split(' ');
  
  if (!args || args.length < 2) {
    await ctx.reply("❌ Неправильный формат. Используйте:\n<code>/submit https://example.com [type]</code>", {
      parse_mode: "HTML"
    });
    return;
  }

  const url = args[1];
  const type = args[2] || "full";

  // Validate URL
  if (!url) {
    await ctx.reply("❌ Неверный URL. Пожалуйста, укажите корректную ссылку.");
    return;
  }

  try {
    new URL(url);
  } catch {
    await ctx.reply("❌ Неверный URL. Пожалуйста, укажите корректную ссылку.");
    return;
  }

  // Validate type
  if (!["full", "site", "og"].includes(type)) {
    await ctx.reply("❌ Неверный тип. Доступные типы: full, site, og");
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
    
    await ctx.reply(`✅ <b>Запрос отправлен!</b>\n\n` +
      `🌐 <b>URL:</b> ${url}\n` +
      `📋 <b>Тип:</b> ${type}\n` +
      `📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
      `Ваш запрос будет рассмотрен в ближайшее время.`, {
      parse_mode: "HTML"
    });

  } catch (error) {
    console.error("Error creating request:", error);
    await ctx.reply("❌ Ошибка при отправке запроса. Попробуйте позже или используйте веб-форму: https://yzlab.ru/preview");
  }
});

// Temporary command to get chat ID - remove this after setup
bot.command("chatid", async (ctx) => {
  await ctx.reply(`Your Chat ID is: ${ctx.chat?.id}`);
});

bot.command("requests", async (ctx) => {
  // Check authorization before processing
  if (!AUTHORIZED_CHAT_ID || ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
    console.log(`Unauthorized access attempt from chat ID: ${ctx.chat?.id}`);
    return;
  }

  try {
    const { data: requests } = await getRequests();
    
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
      
      const message = `🌐 <b>${domain}</b>\n` +
        `📝 <b>Название:</b> ${title}\n` +
        `📄 <b>Описание:</b> ${description}\n` +
        `📧 <b>Email:</b> ${email}\n` +
        `🔗 <b>URL:</b> ${request.url}\n` +
        `📋 <b>Тип:</b> ${type}\n` +
        `📅 <b>Создан:</b> ${new Date(request.created_at).toLocaleString('ru-RU')}`;
      
      const keyboard = new InlineKeyboard()
        .text("✅ Принять", `accept_${request.id}`)
        .text("❌ Отклонить", `reject_${request.id}`);
      
      await ctx.reply(message, {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
    await ctx.reply("Ошибка при получении запросов.");
  }
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

// Handle accepted/rejected status buttons (no action needed)
bot.callbackQuery(/^(accepted|rejected)$/, async (ctx) => {
  // Check authorization before processing
  if (!AUTHORIZED_CHAT_ID || ctx.chat?.id.toString() !== AUTHORIZED_CHAT_ID) {
    console.log(`Unauthorized callback attempt from chat ID: ${ctx.chat?.id}`);
    return;
  }

  await ctx.answerCallbackQuery("Действие уже выполнено.");
});
