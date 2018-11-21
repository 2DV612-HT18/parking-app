import Role from "../../models/Role";
import {getConnection} from "typeorm";

export const resolvers = {
  Mutation: {
    addRole: async (_, args) => {
      let connection = getConnection()
      let role = new Role(args.id, args.role)
      let roleRepository = connection.getRepository(Role)
      let data = await roleRepository.find({ where: {role: args.role }})

      if (data.length < 1) {        
        return connection.manager.save(role)
      }
      else {
        // Throw Error?
      }
    },
  },
};
