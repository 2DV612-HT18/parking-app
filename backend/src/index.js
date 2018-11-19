import { GraphQLServer } from "graphql-yoga";

import createTypeormConnection from "./lib/createTypeormConnection";
import generateSchema from "./lib/generateSchema";

(async () => {
  try {
    const server = new GraphQLServer({
      schema: generateSchema()
    });

    await createTypeormConnection("development");

    server.start(() =>
      console.log("Server is running on http://localhost:4000/")
    );
  } catch (error) {
    console.error(error);
  }
})();
