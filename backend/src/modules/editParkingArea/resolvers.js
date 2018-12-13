import { getConnection } from "typeorm";
import ParkingArea from "../../models/ParkingArea";
import Coordinate from "../../models/Coordinate";

export const resolvers = {
  Mutation: {
    editParkingArea: async (_, { id, name, coordinates }, { user }) => {
      const connection = getConnection();
      const coordinatesRepository = connection.getRepository(Coordinate);
      const parkingAreaRepository = connection.getRepository(ParkingArea);

      const parkingArea = await parkingAreaRepository.findOne({
        where: { id, ownerId: user.id },
        relations: ["coordinates"]
      });

      if (!parkingArea) {
        return false;
      }

      parkingArea.name = name;
      await connection.manager.save(parkingArea);

      coordinates.forEach(async c => {
        const coord = await coordinatesRepository.findOne({
          where: { id: c.id },
          relations: ["parkingArea"]
        });
        coord.latitude = parseFloat(c.latitude);
        coord.longitude = parseFloat(c.longitude);
        await connection.manager.save(coord);
      });

      return parkingArea;
    }
  }
};
