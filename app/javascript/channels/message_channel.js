import consumer from "./consumer"

const btn = document.getElementById('btn');
const body = document.getElementById('body');
const name = document.getElementById('name');
const messages = document.getElementById('messages');

// チャネルを購読 & コールバックを登録
const app = consumer.subscriptions.create("MessageChannel", {
  // メッセージを受信したときの処理
  received(data) {
    const p = document.createElement('p');
    p.textContent = `${data.name}：${data.body}`;
    // prependメソッドは先頭に要素を追加する
    messages.prepend(p);
  },
  // 指定されたメッセージを送信
  sendMessage(name, msg) {
    // 'send_message'はサーバー側のメソッドのこと
    return this.perform('send_message', { name: name, body: msg });
  }
});

btn?.addEventListener('click', e => {
  e.preventDefault();
  app.sendMessage(name.value, body.value);
  body.value = '';
}, false);
