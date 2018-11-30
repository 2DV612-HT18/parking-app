import { GraphQLServer } from "graphql-yoga";
import Redis from "ioredis";
import jwt from "express-jwt";
import Role from "./models/Role";
import createTypeormConnection from "./lib/createTypeormConnection";
import generateSchema from "./lib/generateSchema";
import permissions from "./permissions";

(async () => {
  try {
    const redis = new Redis(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    );

    const server = new GraphQLServer({
      schema: generateSchema(),
      middlewares: [permissions],
      context: ({ request }) => ({
        request,
        redis,
        user: request.user
      })
    });

    // Validate token
    server.express.use(
      jwt({
        secret: process.env.SESSION_SECRET || "devsecret",
        credentialsRequired: false,
        getToken: req => {
          if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            return req.headers.authorization.split(" ")[1];
          }
          if (req.query && req.query.token) {
            return req.query.token;
          }
          return null;
        }
      })
    );

    const connection = await createTypeormConnection("development");

    // Save standard roles if role table is empty
    const role1 = new Role(21, "User");
    const role2 = new Role(22, "ParkingOwner");
    const data = await connection
      .getRepository(Role)
      .find({ where: { name: role1.name } });
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
