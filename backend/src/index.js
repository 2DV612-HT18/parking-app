import { GraphQLServer } from "graphql-yoga";
import Redis from "ioredis";
import jwt from "express-jwt";
import Role from "./models/Role";
import User from "./models/User";
import createTypeormConnection from "./lib/createTypeormConnection";
import generateSchema from "./lib/generateSchema";
import permissions from "./permissions";
import Admin from "./lib/createAdministratorAccount";
import isTokenRevoked from "./lib/redis/isTokenRevoked";

(async () => {
  try {
    const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

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

    // Remove user if token is revoked middleware
    server.express.use(async (req, _, next) => {
      const user = req.user || null;

      if (user) {
        const token = req.headers.authorization.split(" ")[1];
        const revoked = await isTokenRevoked(token, redis, user);

        // Remove user from token if token is revoked
        if (revoked) {
          req.user = null;
        }
      }

      return next();
    });

    const connection = await createTypeormConnection(
      process.env.NODE_ENV || "development"
    );

    // Save standard roles if role table is empty
    const role1 = new Role(21, "User", true, false, false, false);
    const role2 = new Role(22, "ParkingOwner", true, false, true, true);
    const role3 = new Role(23, "Administrator", false, true, false, false);
    const role4 = new Role(24, "ParkingGuard", false, false, false, false);
    const data = await connection
      .getRepository(Role)
      .find({ where: { name: role1.name } });

    if (data.length < 1) {
      await connection.manager.save([role1, role2, role3, role4]);
    }

    // Find admin user
    const findAdmin = await connection
      .getRepository(User)
      .find({ where: { email: process.env.NODEMAILER_USER } });

    // If Admin user is not found, create, add Administrator role and save to DB.
    if (findAdmin.length < 1) {
      const admin = await Admin();

      const role = await connection
        .getRepository(Role)
        .findOne({ where: { name: "Administrator" } });

      admin.roles = [role];

      await connection.manager.save(admin);
    }

    server.start(() =>
      console.log("Server is running on http://localhost:4000/")
    );
  } catch (error) {
    console.error(error);
  }
})();
