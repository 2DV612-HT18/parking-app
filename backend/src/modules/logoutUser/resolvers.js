import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const resolvers = {
  Mutation: {
    logoutUser: async (_, args) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const data = await userRepository.find({ where: { email: args.email } });

      if (data.length === 1) {
        const user = data[0];
        // Remove token from Redis? 
      
        return true;
      }
      // If no user found
      return false;
    }
  }
};
