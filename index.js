import WebSocket from "ws";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs";

const token = "5553721098:AAG9WpET3-NplQqFXf_PGoss66G_MqPR2mo";
const bot = new TelegramBot(token, { polling: true });
const writeFileError = (file, data) => {
  fs.appendFile(file, data, function (err) {
    if (err) {
      errorMessage += `\n${err.toString()}`;
    }
  });
};

const writeFile = (file, data) => {
  fs.writeFile(file, data, function (err) {
    if (err) {
      errorMessage += `\n${err.toString()}`;
    }
  });
};
function start(websocketServerLocation) {
  let ws = new WebSocket(websocketServerLocation);

  ws.on("open", function open(data) {
    try {
      let subscribe = {
        method: "SUBSCRIBE",
        params: ["btcusdt@trade"],
        id: 1,
      };
      ws.send(JSON.stringify(subscribe));
    } catch (e) {
      writeFileError("error.log", `\n${e.toString()}`);
    }
  });

  ws.on("message", function message(data) {
    try {
      let message = JSON.parse(data);
      message = `\n${JSON.stringify(message)}`;
      writeFile("data.log", message);
    } catch (e) {
      writeFileError("error.log", `\n${e.toString()}`);
    }
  });

  ws.onclose = function () {
    writeFileError("error.log", `\nDisconnect`);
    setTimeout(function () {
      lastMessage += "\n-----------------";
      start(websocketServerLocation);
    }, 5000);
  };
}

start("wss://stream.binance.com:9443/ws");
bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Received your message");
});
