import { getConnection } from "typeorm";

import User from "../../models/User";
import Vehicle from "../../models/Vehicle";

export const resolvers = {
  Query: {
    myInfo: async (_, __, { user }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const vehicleRepository = connection.getRepository(Vehicle);

      const myUser = await userRepository.findOne({
        where: { id: user.id }
      });

      // Get user vehicles
      const vehicles = await vehicleRepository.find({
        where: {
          user: myUser
        }
      });

      // Merge vehicles into myUser object
      return { ...myUser, vehicles };
    }
  }
};
