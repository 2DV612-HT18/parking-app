import { getConnection } from "typeorm";
import Notification from "../../models/Notification";

export const resolvers = {
  Query: {
    getNotifications: async (_, __, { user }) => {
      const connection = getConnection();
      const notificationRepository = connection.getRepository(Notification);
      const notifications = await notificationRepository.find({
        relations: ["author", "dismissedUsers"]
      });

      // If user is not logged in.
      if (!user) {
        return null;
      }

      // Filter the notifications to only notifications that hasn't been dismissed by logged in user.
      const filteredNotifications = notifications.filter(
        notification =>
          !notification.dismissedUsers.some(nUser => nUser.id === user.id)
      );

      // Save notification
      return filteredNotifications;
    }
  }
};
