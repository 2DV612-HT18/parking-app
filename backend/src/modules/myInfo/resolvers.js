import { getConnection } from "typeorm";

import User from "../../models/User";
import Vehicle from "../../models/Vehicle";

export const resolvers = {
  Query: {
    myInfo: async (_, __, { user }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      // Return authenticated user
      return userRepository.findOne({ where: { id: user.id } });
    },
    vehicles: async (_, __, { user }) => {
      const connection = getConnection();
      const vehicleRepository = connection.getRepository(Vehicle);

      // Return vehivles
      return vehicleRepository.find({ where: { user: user} });
    }
  }
};
