import Role from "../../models/Role";
import {getConnection} from "typeorm";

export const resolvers = {
  Query: {
    getAllRoles: async (_, args) => {
      const connection = getConnection()
      const roleRepository = connection.getRepository(Role)
      let data = await roleRepository.find()
      console.log(data)
      return data
    },
  },
};
