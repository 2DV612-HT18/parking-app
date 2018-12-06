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
      type: "float"
    },
    latitude: {
      type: "float"
    }
  },
  relations: {
    parkingArea: {
      target: "ParkingArea",
      type: "many-to-one",
      inverseSide: "coordinates",
      joinTable: true
    }
  }
});
