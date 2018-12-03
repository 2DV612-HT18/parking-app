import Role from "../../models/Role";
import User from "../../models/User";
import {getConnection} from "typeorm";

export const resolvers = {
  Query: {
    getAllRoles: async (_, args, { user }) => {
      let data = ""
      const connection = getConnection()
      const roleRepository = connection.getRepository(Role)      
      const userRepository = connection.getRepository(User);

      // If user is logged in, get user from database, else currentUser is false, which means user is not logged in.
      const currentUser = user ? await userRepository.findOne({
        where: { id: user.id },
        relations: ["roles"]
      }) : false;

      if (user && currentUser.roles[0].admin) {
        data = await roleRepository.find()
      } else {
        data = await roleRepository.find({ where: { registration: true } })
      }     
      return data
    },
  },
};
