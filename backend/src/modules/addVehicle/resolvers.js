import { getConnection } from "typeorm";
import Vehicle from "../../models/Vehicle";
import User from "../../models/User";

export const resolvers = {
  Mutation: {
    addVehicle: async (_, args, { user }) => {
      // addVehicle: async (_, args) => {
      const connection = getConnection();
      // get logged in users id
      const userRepository = connection.getRepository(User);
      const loggedInUser = await userRepository.findOne({
        where: { id: user.id }
      });

      console.log("logged in user: ");

      console.log(loggedInUser);
      console.log(loggedInUser.id);

      const vehicle = new Vehicle(0, loggedInUser, args.registrationNumber);

      const vehicleRepository = connection.getRepository(Vehicle);

      // Query the database to check if vehicle exists with rolename specified.
      const exists = await vehicleRepository.findOne({
        where: { registrationNumber: args.registrationNumber }
      });

      // If no vehicle of the same name registration number, add it.
      if (!exists) {
        await connection.manager.save(vehicle);

        return vehicle;
      }
      // Throw Error?
      return null;
    }
  }
};
