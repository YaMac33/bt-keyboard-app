// server.js - Node.js WebSocketサーバー

const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// 静的ファイル配信
app.use(express.static(path.join(__dirname, 'public')));

let latestText = "";
let displayClients = [];

wss.on('connection', (ws, req) => {
  ws.on('message', (msg) => {
    // JSONパース
    let data = {};
    try {
      data = JSON.parse(msg);
    } catch {
      return;
    }

    // 入力側からのテキスト
    if (data.type === 'input') {
      latestText = data.text || "";
      // 表示側に送信
      displayClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'display', text: latestText }));
        }
      });
    }

    // クライアントの種別登録
    if (data.type === 'register' && data.role === 'display') {
      displayClients.push(ws);
      // 初期表示（最新テキスト送信）
      ws.send(JSON.stringify({ type: 'display', text: latestText }));
    }
  });

  ws.on('close', () => {
    // displayClientsから切断クライアント削除
    displayClients = displayClients.filter(client => client !== ws);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
