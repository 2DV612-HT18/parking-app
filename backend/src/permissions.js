import { shield, not } from "graphql-shield";
import isAuthenticated from "./lib/middlewares/isAuthenticated";

export default shield({
  Query: {
    myInfo: isAuthenticated
  },
  Mutation: {
    registerUser: not(isAuthenticated),
    loginUser: not(isAuthenticated),
    logoutUser: isAuthenticated
  }
});
