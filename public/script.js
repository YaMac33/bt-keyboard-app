// script.js - クライアント共通処理

(function () {
  const role = window.btKeyboardApp && window.btKeyboardApp.role;
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${location.host}`;
  const ws = new WebSocket(wsUrl);

  ws.addEventListener('open', () => {
    // 自分の役割をサーバーに通知
    ws.send(JSON.stringify({ type: "register", role }));
  });

  if (role === "input") {
    const textarea = document.getElementById('inputText');
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.addEventListener('click', () => {
      ws.send(JSON.stringify({ type: "input", text: textarea.value }));
      textarea.value = ""; // 送信後クリア
    });
  }

  if (role === "display") {
    const displayText = document.getElementById('displayText');
    ws.addEventListener('message', (event) => {
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch { return; }
      if (data.type === "display") {
        displayText.textContent = data.text || "";
      }
    });
  }
})();
