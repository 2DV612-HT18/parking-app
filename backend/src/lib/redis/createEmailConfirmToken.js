import { v4 } from "uuid";

import { CONFIRM_EMAIL_PREFIX } from "../constants";

export default async (userId, redis) => {
  const key = v4();
  await redis.set(`${CONFIRM_EMAIL_PREFIX}${key}`, userId, "ex", 60 * 60 * 24); // expire after 24h

  return `${key}`;
};
