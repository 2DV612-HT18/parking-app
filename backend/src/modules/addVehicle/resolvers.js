import {getConnection} from "typeorm";
import Vehicle from "../../models/Vehicle";
import User from "../../models/User";

export const resolvers = {
  Mutation: {
    addVehicle: async (_, args, { user }) => {
    // addVehicle: async (_, args) => {
      const connection = getConnection()
      // get logged in users id
      const userRepository = connection.getRepository(User);
      const loggedInUser = userRepository.findOne({ where: { id: user.id } });

      console.log("logged in user: ");
      console.log(loggedInUser);

      const vehicle = new Vehicle(args.id, args.loggedInUser, args.registrationNumber)
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
