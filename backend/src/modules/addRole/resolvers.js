import { getConnection } from "typeorm";
import Role from "../../models/Role";

export const resolvers = {
  Mutation: {
    addRole: async (_, args) => {
      const connection = getConnection();
      const role = new Role(args.id, args.role);
      const roleRepository = connection.getRepository(Role);

      // Query the database to check if role exists with rolename specified.
      const data = await roleRepository.find({ where: { role: args.role } });

      // Send error message if same role exists
      if (data.length > 1) {
        return [
          {
            path: "addRole",
            message: "Role already exist"
          }
        ];
      }

      await connection.manager.save(role);
      return null;
    }
  }
};
