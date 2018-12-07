import { EntitySchema } from "typeorm";
import Role from "../models/Role";

export default new EntitySchema({
  name: "Role",
  target: Role,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    },
    registration: {
      type: "boolean",
      default: false
    },
    admin: {
      type: "boolean",
      default: false
    },
    addParkingAreaPermission: {
      type: "boolean",
      default: false
    }
  },
  relations: {
    users: {
      target: "User",
      type: "many-to-many",
      joinTable: true,
      inverseSide: "roles"
    }
  }
});
