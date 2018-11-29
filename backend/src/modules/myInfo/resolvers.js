import { getConnection } from "typeorm";

import User from "../../models/User";

export const resolvers = {
  Query: {
    myInfo: async (_, __, { user }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      return userRepository.findOne({ relations: ["vehicles"],where: { id: user.id } });
    }
  }
};
