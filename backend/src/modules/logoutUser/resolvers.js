import removeUserSessions from "../../lib/redis/removeUserSessions";

export const resolvers = {
  Mutation: {
    logoutUser: async (_, __, { user, redis }) =>
      removeUserSessions(user.id, redis)
  }
};
