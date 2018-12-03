import Role from "../../models/Role";
import {getConnection} from "typeorm";

export const resolvers = {
  Query: {
    getAllRoles: async (_, args, { user }) => {
      const connection = getConnection()
      const roleRepository = connection.getRepository(Role)
      let data
      if (user && user.admin) {
        data = await roleRepository.find()
      } else {
        data = await roleRepository.find({ where: { registration: true } })
      }     
      return data
    },
  },
};
