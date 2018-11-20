import Role from "../../models/Role";
import {getConnection} from "typeorm";

export const resolvers = {
  Mutation: {
    addRole: async (_, args) => {
      let connection = getConnection()
      const role = new Role(args.id, args.role)     
      return connection.manager.save(role)
    },
  },
};