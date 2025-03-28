class MessagesController < ApplicationController
  def index
    # @messages = Message.order(updated_at: :desc)
    @messages = Message.where(topic: params[:topic]).order(updated_at: :desc)
  end
end
