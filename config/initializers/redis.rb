require "redis"

$Redis = Redis.new(url: ENV["REDIS_URL"])
