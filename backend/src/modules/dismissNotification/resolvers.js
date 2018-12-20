import { getConnection } from "typeorm";
import User from "../../models/User";
import Notification from "../../models/Notification";

export const resolvers = {
  Mutation: {
    dismissNotification: async (_, args, { user }) => {
      console.log(user);
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const notificationRepository = connection.getRepository(Notification);
      const loggedInUser = await userRepository.findOne({
        where: { id: user.id }
      });

      const notification = await notificationRepository.findOne({
        where: { id: args.id },
        relations: ["author", "dismissedUsers"]
      });

      // If successfully found logged in user and notification, push the logged in user to the dismissed array.
      if (loggedInUser && notification) {
        notification.dismissedUsers.push(loggedInUser);
        await connection.manager.save(notification);
        return true;
      }
      return false;
    }
  }
};
