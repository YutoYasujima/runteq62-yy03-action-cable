require "redis"

$Redis = Redis.new(
  url: "redis://:#{ENV['REDIS_PASSWORD']}@#{ENV['REDIS_HOST']}:#{ENV['REDIS_PORT']}/0",
  timeout: 5 # 必要に応じてタイムアウト時間を設定
)
