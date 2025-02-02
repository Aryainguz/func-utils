import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect();

export const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate:${ip}`;
  const requests = await redisClient.incr(key);

  if (requests === 1) {
    await redisClient.expire(key, 60); // Reset after 60 sec
  }

  if (requests > 100) {
    return res.status(429).json({ message: "Too many requests" });
  }

  next();
};
