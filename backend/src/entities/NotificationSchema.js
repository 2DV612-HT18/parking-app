import { EntitySchema } from "typeorm";
import Notification from "../models/Notification";

export default new EntitySchema({
  name: "Notification",
  target: Notification,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    message: {
      type: "varchar"
    }
  },
  relations: {
    author: {
      target: "User",
      type: "many-to-one",
      inverseSide: "notifications",
      joinTable: true,
      onDelete: "CASCADE"
    },
    dismissedUsers: {
      target: "User",
      type: "many-to-many",
      inverseSide: "dismissedNotifications",
      joinTable: true,
      onDelete: "CASCADE"
    }
  }
});
