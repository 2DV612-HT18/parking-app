import { shield, not } from "graphql-shield";
import isAuthenticated from "./lib/middlewares/isAuthenticated";

export default shield({
  Mutation: {
    registerUser: not(isAuthenticated),
    loginUser: not(isAuthenticated)
  }
});
