import { getConnection } from "typeorm";
import removeUserSessions from "../../lib/redis/removeUserSessions";

import User from "../../models/User";

const bcrypt = require("bcrypt");
export const resolvers = {
  Mutation: {
    closeAccount: async (_, args, { user, redis }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      // Query the database to check if user exists.
      const data = await userRepository.find({ where: { id: user.id }, relations: ["roles", "vehicles"] });

      // If user exists
      if (data.length === 1) {
        const user2 = data[0];

        const passwordMatches = await bcrypt.compare(
          args.password,
          user2.password
        );

        // If password matches
        if (passwordMatches) {

          // delete vehicles
          console.log("Vehicles");
          user2.vehicles.forEach( ( vehicle ) => {
            connection.manager.remove(vehicle);
          });

          //log out user
          removeUserSessions(user.id, redis)

          //delete user
          connection.manager.remove(data);
         
          return true;
        }
      }
      // No user found or password didn't match
      return false;

    }
  }
};
