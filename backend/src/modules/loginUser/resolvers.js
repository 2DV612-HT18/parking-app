import { getConnection } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../models/User";

export const resolvers = {
  Mutation: {
    loginUser: async (_, args) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      // Query the database to check if user exists.
      const data = await userRepository.find({ where: { email: args.email } });

      // If user exists
      if (data.length === 1) {
        const user = new User(
          data[0].role,
          data[0].firstName,
          data[0].lastName,
          data[0].email,
          data[0].personalNumber,
          data[0].password
        );

        const passwordMatches = await bcrypt.compare(
          args.password,
          user.password
        );

        // If password matches
        if (passwordMatches) {
          // return {token, user}
        } else {
          // Return nothing? / Throw error
        }
      }
      // No user found
      return null;
    }
  }
};
