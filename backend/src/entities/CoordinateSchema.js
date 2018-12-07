import { EntitySchema } from "typeorm";
import Coordinate from "../models/Coordinate";

export default new EntitySchema({
  name: "Coordinate",
  target: Coordinate,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    longitude: {
      type: "decimal"
    },
    latitude: {
      type: "decimal"
    }
  },
  relations: {
    parkingArea: {
      target: "ParkingArea",
      type: "many-to-one",
      inverseSide: "coordinates",
      joinTable: true,
      onDelete: "CASCADE"
    }
  }
});
