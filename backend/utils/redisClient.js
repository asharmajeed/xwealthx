import { createClient } from "redis";

// Initialize Redis client
const redisClient = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-11994.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 11994,
  },
});

// Handle connection events
redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis Cloud");
});

// Connect the client
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

export default redisClient;
