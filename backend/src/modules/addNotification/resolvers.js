import { getConnection } from "typeorm";
import User from "../../models/User";
import Notification from "../../models/Notification"

export const resolvers = {
  Mutation: {
    addNotification: async (_, { message }, { user }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const loggedInUser = await userRepository.findOne({
        where: { id: user.id }
      });
      const notification = new Notification(0, message)
      notification.author = loggedInUser

      return await connection.manager.save(notification);
    }
  }
};
