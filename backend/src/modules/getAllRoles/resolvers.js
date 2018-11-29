import Role from "../../models/Role";
import {getConnection} from "typeorm";

export const resolvers = {
  Query: {
    getAllRoles: async (_, args) => {
      let connection = getConnection()
      let roleRepository = connection.getRepository(Role)

      var ret = '{"Role":[]}'
      var obj = JSON.parse(ret)
      for(var R in roleRepository.Role){
        if (true){
          obj['Role'].push({"id":R.id,"role":R.role})
        }
      }
      ret = JSON.stringify(obj)

      return ret
    },
  },
};
