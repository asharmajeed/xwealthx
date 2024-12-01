import redisClient from "./redisClient.js";

// Cache duration in seconds (30 minutes)
const CACHE_DURATION_SECONDS = 30 * 60;

/**
 * Store data in Redis with expiration.
 * @param {string} key
 * @param {Object} value
 * @param {number} ttl
 */
export const setQuizSession = async (key, value, ttl = CACHE_DURATION_SECONDS) => {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttl, // Set expiry in seconds
    });
  } catch (error) {
    console.error("Error setting Redis key:", error);
  }
};

/**
 * Retrieve data from Redis.
 * @param {string} key
 * @returns {Object|null}
 */
export const getQuizSession = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error fetching Redis key:", error);
    return null;
  }
};
