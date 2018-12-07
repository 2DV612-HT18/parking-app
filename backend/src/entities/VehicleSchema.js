import { EntitySchema } from "typeorm";
import Vehicle from "../models/Vehicle";

export default new EntitySchema({
  name: "Vehicle",
  target: Vehicle,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    registrationNumber: {
      type: "varchar"
    }
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      inverseSide: "vehicles",
      onDelete: "CASCADE"
    }
  }
});
