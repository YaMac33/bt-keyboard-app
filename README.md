# bt-keyboard-app

iPadやMacへの文字入力を、iPhone等のスマホからWeb経由で送信できるアプリです。  
iPhone等で入力したテキストが、リアルタイムでMacやiPadブラウザに表示されます。

## 構成

- Node.js + Express + WebSocket サーバー
- クライアント（入力画面: `index.html`、表示画面: `display.html`）

## 使い方

1. サーバーを起動（`npm install` → `npm start`）
2. iPhoneで `/index.html` にアクセス（入力画面）
3. Mac/iPadで `/display.html` にアクセス（表示画面）
4. 入力した文字がリアルタイムで転送されます

## フォルダ構成

- public/index.html ... スマホ用入力画面
- public/display.html ... Mac/iPad表示画面
- public/script.js ... クライアント共通JS
- server.js ... Node.jsサーバー本体

## ライセンス

MIT
