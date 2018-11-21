import User from "../../models/User";
import {getConnection} from "typeorm";

export const resolvers = {
  Mutation: {
    registerUser: async (_, args) => {
      let connection = getConnection()
      let user = new User(args.id, args.role, args.firstName, args.lastName, args.email, args.personalNumber, args.password)
      let userRepository = connection.getRepository(User)
      let data = await userRepository.find({ where: {email: args.email }})

      // If user with specified email doesn't exist, save the user to the database.
      if (data.length < 1) {        
        return connection.manager.save(user)
      }
      else {
        // Throw Error?
      }
    },
  },
};