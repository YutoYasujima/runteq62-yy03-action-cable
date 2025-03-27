class MessagesController < ApplicationController
  def index
    @messages = Message.order(updated_at: :desc)
  end
end
