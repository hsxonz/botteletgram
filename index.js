import WebSocket from "ws";

const ws = new WebSocket(
  "wss://stream.binance.com:9443/stream?streams=ethusdt@trade"
);

ws.on("open", function open(data) {
  try {
    let subscribe = {
      method: "SUBSCRIBE",
      params: ["btcusdt@trade"],
      id: 1,
    };
    ws.send(JSON.stringify(subscribe));
  } catch (e) {
    console.log(e);
  }
});

ws.on("message", function message(data) {
  try {
    let message = JSON.parse(data);
    console.log(message);
  } catch (e) {
    console.log(e);
  }
});

ws.on("close", function close(data) {
  console.log(data);
});
