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
    role: {
      type: "varchar"
    }
  }
});
