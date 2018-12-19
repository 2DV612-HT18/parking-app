import { getConnection } from "typeorm";
import User from "../../models/User";
import emailSender from "../../nodemailer";
import createEmailConfirmToken from "../../lib/redis/createEmailConfirmToken";
import Role from "../../models/Role";

const bcrypt = require("bcrypt");

export const resolvers = {
  Mutation: {
    registerUser: async (_, args, { redis }) => {
      const connection = getConnection();
      const saltRounds = 6;

      const hashedPassword = await bcrypt.hash(args.password, saltRounds);

      const roleRepository = connection.getRepository(Role);
      const role = await roleRepository.findOne({ where: { name: args.role } });

      // Can't add to role, registration unsuccessful
      if (!role) {
        return [{path: "registerUser", message: "Registration failed. " + args.role + " is not a valid role!"}];
      }

      const user = new User(
        0,
        args.firstName,
        args.lastName,
        args.email,
        args.personalNumber,
        hashedPassword,
        false
      );

      user.roles = [role];

      const userRepository = connection.getRepository(User);

      // Query the database to check if user exists with email specified.
      const data = await userRepository.find({ where: { email: args.email } });

      // If user with specified email doesn't exist, save the user to the database.
      if (data.length < 1) {
        await connection.manager.save(user);

        // Create email token
        const token = await createEmailConfirmToken(user.id, redis);
        // console.log(token);
        const url = process.env.SITE_BASE_URL || "http://localhost:8080";
        const link = `${url}/verify?token=${token}`;

        // call send email function
        emailSender.sendEmail(args.email, link);

        return null;
      }
      // Throw Error?
      return [{path: "registerUser", message: "Registration failed. The email " + args.email + " already exsists!"}];
    }
  }
};
