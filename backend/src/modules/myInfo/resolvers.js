import { getConnection } from "typeorm";

import User from "../../models/User";

export const resolvers = {
  Query: {
    myInfo: async (_, __, { user }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      const myUser = await userRepository.findOne({
        where: { id: user.id },
        relations: ["roles", "vehicles"]
      });

      return myUser;
    }
  }
};
