import { getConnection } from "typeorm";
import Vehicle from "../../models/Vehicle";

export const resolvers = {
  Mutation: {
    removeVehicle: async (_, args, { user }) => {
      const connection = getConnection();
      const vehicleRepository = connection.getRepository(Vehicle);
      // Query the database to check if vehicle for user exists
      const vehicle = await vehicleRepository.findOne({
        where: { id: args.id, userId: user.id }
      });

      // If vehicle exists remove it
      if (vehicle) {
        await connection.manager.remove(vehicle);
        return true;
      }
        return false;
      
    }
  }
};
