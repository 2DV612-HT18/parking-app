import { getConnection } from "typeorm";
import Notification from "../../models/Notification"

export const resolvers = {
  Query: {
    getNotifications: async (_, __, { user }) => {
      const connection = getConnection();
      const notificationRepository = connection.getRepository(Notification);    
      const notifications = await notificationRepository.find({ relations: ["author", "dismissed"] });

      // If user is not logged in.
      if (!user) {
        return null;
      }

      // Filter the notifications to only notifications that hasn't been dismissed by logged in user.
      const filteredNotifications = notifications.filter(notification => {
        if (!notification.dismissed.some(nUser => nUser.id === user.id )) {
          return notification;   
        } else {
          return;
        }
      })

      // Save notification
      return filteredNotifications;
    }
  }
};
