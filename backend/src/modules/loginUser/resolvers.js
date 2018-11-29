import { getConnection } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import { USER_LOGIN_PREFIX } from "../../lib/constants";

export const resolvers = {
  Mutation: {
    loginUser: async (_, args, { redis }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      // Query the database to check if user exists.
      const data = await userRepository.find({ where: { email: args.email } });

      // If user exists
      if (data.length === 1) {
        const user = data[0];

        const passwordMatches = await bcrypt.compare(
          args.password,
          user.password
        );

        // If password matches
        if (passwordMatches) {
          // Create token
          const token = await jwt.sign(
            { id: user.id },
            process.env.SESSION_SECRET || "devsecret",
            { expiresIn: 1000 * 60 * 60 * 24 } // 1 day
          );

          // Save token to redis
          await redis.lpush(`${USER_LOGIN_PREFIX}${user.id}`, token);

          // User is logged in
          return { token, user };
        }
      }
      // No user found or password didn't match
      return null;
    }
  }
};
