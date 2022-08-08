import TelegramBot from "node-telegram-bot-api";
const token = "5553721098:AAG9WpET3-NplQqFXf_PGoss66G_MqPR2mo";

const bot = new TelegramBot(token, { polling: true });
const authID = [];
var q = [];
bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  if (authID.includes(chatId)) bot.sendMessage(chatId, JSON.stringify(msg));
  else bot.sendMessage(chatId, "liên hệ @hsxonz để tham gia");
});

bot.onText(/\/auth (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  q.push(chatId);
  console.log("waitting");
});
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  // if (!msg.text.includes("/start"))
  //bot.sendMessage(chatId, JSON.stringify(msg));
});

export { q, bot };
