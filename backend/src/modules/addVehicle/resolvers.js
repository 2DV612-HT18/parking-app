import {getConnection} from "typeorm";
import Vehicle from "../../models/Vehicle";

export const resolvers = {
  Mutation: {
    addVehicle: async (_, args) => {
      const connection = getConnection()
      const vehicle = new Vehicle(args.id, args.user, args.registrationNumber)
      const vehicleRepository = connection.getRepository(Vehicle)

      // Query the database to check if vehicle exists with rolename specified.
      const data = await vehicleRepository.find({ where: {vehicle: args.vehicle }})

      // If no role of the same name exists, add it.
      if (data.length < 1) {
        return connection.manager.save(vehicle)
      }
      else {
        // Throw Error?
      }
    },
  },
};
