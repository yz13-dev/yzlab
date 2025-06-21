import { hydrate, HydrateFlavor } from "@grammyjs/hydrate";
import { Menu } from "@grammyjs/menu";
import { Bot, Context, InlineKeyboard, InlineQueryResultBuilder } from "grammy";

type BotContext = HydrateFlavor<Context>;
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";

export const bot = new Bot<BotContext>(BOT_TOKEN);

const menu = new Menu("services-menu").text("Все услуги").row();

bot.use(hydrate());
bot.use(menu);

bot.command("start", async (ctx) => {
  await bot.api.setMyCommands([
    {
      command: "services",
      description: "Показать список услуг",
    },
  ]);

  const inlineKeyboard = new InlineKeyboard().text("Услуги", "click-services");

  await ctx.reply("Привет! Чем могу помочь?", {
    reply_markup: inlineKeyboard,
  });
});

bot.command("user", async (ctx) => {});

bot.inlineQuery("website", async (ctx) => {
  const result = InlineQueryResultBuilder.article("id:website", "Сайт", {
    reply_markup: new InlineKeyboard().url("YZ13 Website", "https://yz13.ru/"),
  }).text(`<b>YZ13</b> - Фронтенд разработчик`, { parse_mode: "HTML" });

  await ctx.answerInlineQuery([result], { cache_time: 24 * 3600 });
});
