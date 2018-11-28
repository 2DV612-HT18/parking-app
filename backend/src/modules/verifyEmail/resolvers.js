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
        // Set verified to true.
        const user = await userRepository.findOne({ where: { id: userId } });
        user.verified = true
        await connection.manager.save(user)

        // Remove token from redis
        await redis.del(`${CONFIRM_EMAIL_PREFIX}${token}`);

        // Verification successful
        return true;
      }
      // Verification unsuccessful
      return false;
    }
  }
};
