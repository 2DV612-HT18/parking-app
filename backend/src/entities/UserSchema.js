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
    role: {
      type: "varchar"
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
  },
  relations: {
    roles: {
        target: "Role",
        type: "many-to-one",
        joinTable: true,
    },
    vehicles: {
        target: "Vehicles",
        type: "one-to-many",
        joinTable: true,
    },
  }
});
