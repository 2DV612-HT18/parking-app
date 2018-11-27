import { rule } from "graphql-shield";
import { USER_LOGIN_PREFIX } from "../constants";

export default rule()(async (_, __, { user, redis, request }) => {
  if (!user) {
    return false;
  }

  // Get tokens from redis
  const token = request.headers.authorization.split(" ")[1];
  const userTokens = await redis.lrange(
    `${USER_LOGIN_PREFIX}${user.id}`,
    0,
    -1
  );

  return userTokens.includes(token);
});
