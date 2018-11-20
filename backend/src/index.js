import { GraphQLServer } from "graphql-yoga";
import Role from "./models/Role";
import createTypeormConnection from "./lib/createTypeormConnection";
import generateSchema from "./lib/generateSchema";

(async () => {
  try {
    const server = new GraphQLServer({
      schema: generateSchema()
    });

    await createTypeormConnection("development").then((connection) => {
      const role1 = new Role(21, "User")
      const role2 = new Role(22, "ParkingOwner")      
      return connection.manager.save([role1, role2])
    });
    
    server.start(() =>
      console.log("Server is running on http://localhost:4000/")
    );
  } catch (error) {
    console.error(error);
  }
})();
