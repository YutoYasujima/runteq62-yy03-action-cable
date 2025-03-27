class MessageChannel < ApplicationCable::Channel
  # クライアントがサーバーに接続したとき
  def subscribed
    stream_from "general"
  end

  # 接続が解除されたとき
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # メッセージを登録 & generalストリームにブロードキャスト
  def send_message(data)
    ActionCable.server.broadcast "general", { name: data["name"], body: data["body"] }
    Message.create topic: "general", name: data["name"], body: data["body"]
  end
end
