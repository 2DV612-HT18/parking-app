import { getConnection } from "typeorm";
import User from "../../models/User";
import { CONFIRM_EMAIL_PREFIX } from "../../lib/constants";

export const resolvers = {
  Mutation: {
    verifyEmail: async (_, { token }, { redis }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      // Get user id from redis with token
      const userId = Number(await redis.get(`${CONFIRM_EMAIL_PREFIX}${token}`));

      if (userId) {
        // TODO: Update user to be confirmed here

        // Remove token from redis
        await redis.del(`${CONFIRM_EMAIL_PREFIX}${token}`);

        return true;
      }

      return false;
    }
  }
};
