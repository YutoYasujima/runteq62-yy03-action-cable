class ChatRoomsController < ApplicationController
  def index
    @rooms = ChatRoom.includes(:chats).order(updated_at: :desc)
    @room = ChatRoom.new
  end

  def show
    @room = ChatRoom.find(params[:id])
    @chats = @room.chats.order(updated_at: :desc)
  end

  def create
    @room = ChatRoom.new(chat_room_params)
    if @room.save
      redirect_to chat_room_path(@room)
    else
      redirect_to chat_rooms_path
    end
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end
end
