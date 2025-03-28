class Chat < ApplicationRecord
  belongs_to :chat_room

  validates :user_name, presence: true
  validates :content, presence: true
end
