class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chat_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    Chat.create(user_name: data["user_name"], content: data["content"], chat_room_id: data["chat_room_id"])
    ActionCable.server.broadcast("chat_#{data["chat_room_id"]}", { user_name: data["user_name"], content: data["content"] })
  end
end
