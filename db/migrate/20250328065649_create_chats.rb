class CreateChats < ActiveRecord::Migration[7.2]
  def change
    create_table :chats do |t|
      t.string :user_name, null: false
      t.text :content, null: false
      t.references :chat_room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
