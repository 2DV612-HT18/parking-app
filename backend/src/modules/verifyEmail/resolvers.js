import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const resolvers = {
  Mutation: {
    verifyEmail: async (_, args) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const verificationToken = args.token;

      // Remove token
      return null;
    }
  }
};
