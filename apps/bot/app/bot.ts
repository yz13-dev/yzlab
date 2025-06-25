import { hydrate, HydrateFlavor } from "@grammyjs/hydrate";
import { Bot, Context, InlineKeyboard } from "grammy";

type BotContext = HydrateFlavor<Context>;
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
const AUTHORIZED_CHAT_ID = process.env.AUTHORIZED_CHAT_ID;
const API_BASE_URL = "https://api.yzlab.ru";

// API functions
async function getRequests() {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`);
    if (!response.ok) throw new Error('Failed to fetch requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching requests:', error);
    return { data: null };
  }
}

async function acceptRequest(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}/accept`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to accept request');
    return await response.json();
  } catch (error) {
    console.error('Error accepting request:', error);
    throw error;
  }
}

async function rejectRequest(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}/reject`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to reject request');
    return await response.json();
  } catch (error) {
    console.error('Error rejecting request:', error);
    throw error;
  }
}

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
    // Authorized user - show actual commands
    await bot.api.setMyCommands([
      {
        command: "requests",
        description: "Показать запросы на индексацию",
      },
    ]);

    await ctx.reply("Привет! Используй /requests для просмотра запросов на индексацию.");
  } else {
    // Unauthorized user - show empty commands
    await bot.api.setMyCommands([]);
    
    // Don't send any response to unauthorized users
    console.log(`Unauthorized access attempt from chat ID: ${ctx.chat?.id}`);
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
