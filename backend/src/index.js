import { GraphQLServer } from "graphql-yoga";
import Role from "./models/Role";
import createTypeormConnection from "./lib/createTypeormConnection";
import generateSchema from "./lib/generateSchema";

(async () => {
  try {
    const server = new GraphQLServer({
      schema: generateSchema()
    });

    const connection = await createTypeormConnection("development");

    // Save standard roles if role table is empty
    const role1 = new Role(21, "User");
    const role2 = new Role(22, "ParkingOwner");
    const data = await connection
      .getRepository(Role)
      .find({ where: { role: role1.role } });
    if (data.length < 1) {
      await connection.manager.save([role1, role2]);
    }

    server.start(() =>
      console.log("Server is running on http://localhost:4000/")
    );
  } catch (error) {
    console.error(error);
  }
})();
