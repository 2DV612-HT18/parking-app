import { USER_LOGIN_PREFIX } from "../constants";

export default async (token, redis, user) => {
  // Get tokens from redis
  const userTokens = await redis.lrange(
    `${USER_LOGIN_PREFIX}${user.id}`,
    0,
    -1
  );

  return !userTokens.includes(token);
};
