import { getConnection } from "typeorm";
import User from "../../models/User";
import emailSender from "../../nodemailer";

const bcrypt = require("bcrypt");

export const resolvers = {
  Mutation: {
    registerUser: async (_, args) => {
      const connection = getConnection();
      const saltRounds = 6;

      const hashedPassword = await bcrypt.hash(args.password, saltRounds);

      const user = new User(
        0,
        args.role,
        args.firstName,
        args.lastName,
        args.email,
        args.personalNumber,
        hashedPassword
      );
      const userRepository = connection.getRepository(User);

      // Query the database to check if user exists with email specified.
      const data = await userRepository.find({ where: { email: args.email } });

      // If user with specified email doesn't exist, save the user to the database.
      if (data.length < 1) {
        // call send email function
        emailSender.sendEmail(args.email);
        await connection.manager.save(user);

        return user;
      }
      // Throw Error?
      return null;
    }
  }
};
