import Vehicle from "../../models/Vehicle";
import {getConnection} from "typeorm";

export const resolvers = {
  Mutation: {
    addVehicle: async (_, args) => {
      let connection = getConnection()
      let vehicle = new Vehicle(args.id, args.registrationNumber)
      let VehicleRepository = connection.getRepository(Vehicle)

      // Query the database to check if vehicle exists with rolename specified.
      let data = await vehicleRepository.find({ where: {vehicle: args.vehicle }})

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
