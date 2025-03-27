json.extract! message, :id, :topic, :name, :body, :created_at, :updated_at
json.url message_url(message, format: :json)
