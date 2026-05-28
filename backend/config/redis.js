require("dotenv").config();

const redis = require("redis");

const redisClient = redis.createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,

  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("connect", () => {
  console.log("Redis conectado");
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;