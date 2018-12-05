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
      inverseSide: "parkingAreas"
    },
    topLeftCoordinate: {
      target: "Coordinate",
      type: "one-to-one"
    },
    topRightCoordinate: {
      target: "Coordinate",
      type: "one-to-one"
    },
    bottomLeftCoordinate: {
      target: "Coordinate",
      type: "one-to-one"
    },
    bottomRightCoordinate: {
      target: "Coordinate",
      type: "one-to-one"
    }
  }
});
