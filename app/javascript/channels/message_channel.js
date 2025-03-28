import consumer from "./consumer"

const btn = document.getElementById('btn');
const body = document.getElementById('body');
const name = document.getElementById('name');
const messages = document.getElementById('messages');
const paths = location.href.split('/');
const topic = paths[paths.length - 1];

// チャネルを購読 & コールバックを登録
const app = consumer.subscriptions.create(
  { channel: "MessageChannel", topic }, {
  // メッセージを受信したときの処理
  received(data) {
    const p = document.createElement('p');
    p.textContent = `${data.name}：${data.body}`;
    // prependメソッドは先頭に要素を追加する
    messages.prepend(p);
  },
  // 指定されたメッセージを送信
  sendMessage(topic, name, body) {
    // 'send_message'はサーバー側のメソッドのこと
    return this.perform('send_message', { topic, name, body });
  }
});

btn?.addEventListener('click', e => {
  e.preventDefault();
  app.sendMessage(topic, name.value, body.value);
  body.value = '';
}, false);
