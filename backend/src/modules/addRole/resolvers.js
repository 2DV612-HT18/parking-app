import {getConnection} from "typeorm";
import Role from "../../models/Role";

export const resolvers = {
  Mutation: {
    addRole: async (_, args) => {
      const connection = getConnection()
      const role = new Role(args.id, args.role)
      const roleRepository = connection.getRepository(Role)

      // Query the database to check if role exists with rolename specified.
      const data = await roleRepository.find({ where: {role: args.role }})

      // If no role of the same name exists, add it. 
      if (data.length < 1) {        
        return connection.manager.save(null)
      }
      return null;      
    },
  },
};
