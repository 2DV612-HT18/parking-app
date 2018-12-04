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
  }

  // TODO: add relation to parking area (doesn't exist yet)
});
