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
    coordinates: {
      target: "Coordinate",
      type: "one-to-many"
    },
    rates: {
      target: "Rate",
      type: "one-to-many",
      inverseSide: "parkingArea"
    }
  }
});
