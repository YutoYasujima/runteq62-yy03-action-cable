import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer";

// Connects to data-controller="chat"
export default class extends Controller {
  static targets = ["chats", "user", "content", "btn"];
  static values = { roomId: String };

  connect() {
    const chats = this.chatsTarget;
    this.subscription = consumer.subscriptions.create(
      { channel: "ChatChannel", room: this.roomIdValue },
      {
        // 受信したときにビューに追加
        received(data) {
          const p = document.createElement('p');
          p.textContent = `${data.user_name}：${data.content}`;
          // prependメソッドは先頭に要素を追加する
          chats.prepend(p);
        },
        // 指定されたメッセージを送信
        sendMessage(user_name, content, chat_room_id) {
          // 'send_message'はサーバー側のメソッドのこと
          return this.perform('send_message', { user_name, content, chat_room_id });
        },
      }
    );
  }

  send(e) {
    e.preventDefault();
    this.subscription.sendMessage(this.userTarget.value, this.contentTarget.value, this.roomIdValue);
    this.contentTarget.value = '';
  }

  // このdisconnectはstimulusのメソッド
  disconnect() {
    if (this.subscription) {
      // 購読を破棄する
      this.subscription.unsubscribe();
    }
  }
}
