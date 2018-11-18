import { GraphQLServer } from "graphql-yoga";

import generateSchema from "./lib/generateSchema";

const server = new GraphQLServer({
  schema: generateSchema()
});

server.start(() => console.log("Server is running on http://localhost:4000/"));
