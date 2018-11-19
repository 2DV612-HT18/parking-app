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
    email: {
      type: "varchar"
    }
  }
});
