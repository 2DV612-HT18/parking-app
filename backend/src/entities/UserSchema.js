import { EntitySchema } from "typeorm";
import User from "../models/User";

export default new EntitySchema({
  name: "User",
  target: User,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    firstName: {
      type: "varchar"
    },
    lastName: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    },
    personalNumber: {
      type: "varchar"
    },
    password: {
      type: "varchar"
    },
    verified: {
      type: "boolean",
      default: false
    }
  },
  relations: {
    roles: {
      target: "Role",
      type: "many-to-many",
      inverseSide: "users"
    },
    vehicles: {
      target: "Vehicle",
      type: "one-to-many",
      joinTable: true,
      inverseSide: "user"
    },
    parkingAreas: {
      target: "ParkingArea",
      type: "one-to-many",
      inverseSide: "owner"
    },
    dismissedNotifications: {
      target: "Notification",
      type: "many-to-many",
      inverseSide: "dismissedUsers"
    },
    notifications: {
      target: "Notification",
      type: "one-to-many",
      inverseSide: "author"
    },
    currentParkingAreas: {
      target: "ParkingArea",
      type: "many-to-many",
      inverseSide: "parkedUser",
      joinTable: true
    }
  }
});
