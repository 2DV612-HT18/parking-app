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

      if (!loggedInUser) {
        return null
      }
      // Create a new notification and select the logged in user as the author.
      const notification = new Notification(0, message)
      notification.author = loggedInUser

      // Save notification
      return await connection.manager.save(notification);
    }
  }
};
