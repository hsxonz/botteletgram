import WebSocket from "ws";
import logUpdate from "log-update";
import fs from "fs";

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
      writeFile("data.txt", message);
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
