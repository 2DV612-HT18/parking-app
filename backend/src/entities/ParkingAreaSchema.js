import { EntitySchema } from "typeorm";
import ParkingArea from "../models/ParkingArea";

export default new EntitySchema({
  name: "ParkingArea",
  target: ParkingArea,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    }
  },
  relations: {
    owner: {
      target: "User",
      type: "many-to-one",
      inverseSide: "parkingAreas",
      onDelete: "CASCADE"
    },
    // TODO: Make coordinates into an array instead?
    coordinates: {
      target: "Coordinate",
      type: "one-to-many"
    }
  }
});
