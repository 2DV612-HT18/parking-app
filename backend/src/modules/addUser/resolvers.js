import { getConnection } from "typeorm";
import User from "../../models/User";
import Role from "../../models/Role";

const bcrypt = require("bcrypt");

export const resolvers = {
  Mutation: {
    addUser: async (_, args) => {
      const connection = getConnection();
      const saltRounds = 6;

      const hashedPassword = await bcrypt.hash(args.password, saltRounds);

      const roleRepository = connection.getRepository(Role);
      const role = await roleRepository.findOne({ where: { name: args.role } });

      // Can't add to role, registration unsuccessful
      if (!role) {
        return [{path: "addUser", message: "Registration failed. " + args.role + " is not a existing role!"}];
      }

      const user = new User(
        0,
        args.firstName,
        args.lastName,
        args.email,
        args.personalNumber,
        hashedPassword,
        true
      );

      user.roles = [role];

      const userRepository = connection.getRepository(User);

      // Query the database to check if user exists with email specified.
      const data = await userRepository.find({ where: { email: args.email } });

      // If user with specified email doesn't exist, save the user to the database.
      if (data.length < 1) {   
        connection.manager.save(user);            
        return null;
      }
      // Throw Error?
      return [{path: "addUser", message: "Registration failed. user with email " + args.email + " already exists!"}];
    }
  }
};
