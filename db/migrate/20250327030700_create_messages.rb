class CreateMessages < ActiveRecord::Migration[7.2]
  def change
    create_table :messages do |t|
      t.string :topic
      t.string :name
      t.string :body

      t.timestamps
    end
  end
end
