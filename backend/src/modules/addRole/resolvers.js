import Role from "../../models/Role";
import {getConnection} from "typeorm";

export const resolvers = {
  Mutation: {
    addRole: async (_, args) => {
      let connection = getConnection()
      let role = new Role(args.id, args.role)
      let roleRepository = connection.getRepository(Role)

      // Query the database to check if role exists with rolename specified.
      let data = await roleRepository.find({ where: {role: args.role }})

      // If no role of the same name exists, add it. 
      if (data.length < 1) {        
        return connection.manager.save(role)
      }
      else {
        // Throw Error?
      }
    },
  },
};
