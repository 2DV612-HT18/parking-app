import { getConnection } from "typeorm";

import User from "../../models/User";
import Vehicle from "../../models/Vehicle";

export const resolvers = {
  Query: {
    myInfo: async (_, __, { user }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      const oneUser = await userRepository.findOne({ where: { id: user.id } });

      const vehicleRepository = connection.getRepository(Vehicle);

      oneUser.vehicles = await vehicleRepository.find({ where: { userid: user.id} });

      // Return authenticated user
      return oneUser


    }
  }
};
