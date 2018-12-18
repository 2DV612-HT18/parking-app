import { EntitySchema } from "typeorm";
import Rate from "../models/Rate";

export default new EntitySchema({
  name: "Rate",
  target: Rate,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    startTime: {
      type: "time"
    },
    endTime: {
      type: "time"
  },
    startDate: {
        type: "date",
        nullable: true
    },
    endDate: {
        type: "date",
        nullable: true
    },
    charge: {
        type: "decimal"
    },
    repeat: {
        type: "varchar"
    }
  },
  relations: {
    parkingArea: {
      target: "ParkingArea",
      type: "many-to-one",
      inverseSide: "rates",
      onDelete: "CASCADE"
    }
  }
});
