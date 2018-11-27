import { USER_LOGIN_PREFIX } from "../constants";

export default async (userId, redis) => {
  const loginTokens = await redis.lrange(
    `${USER_LOGIN_PREFIX}${userId}`,
    0,
    -1
  );

  // No login tokens found
  if (!loginTokens) {
    return false;
  }

  // Remove all sessions from redis
  const redisPipeline = redis.multi();
  loginTokens.forEach(async token => {
    redisPipeline.lrem(`${USER_LOGIN_PREFIX}${userId}`, 0, token);
  });
  await redisPipeline.exec(error => {
    if (error) {
      console.error(error);
    }
  });
  return true;
};
