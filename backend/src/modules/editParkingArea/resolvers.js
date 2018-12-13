import { getConnection } from "typeorm";
import ParkingArea from "../../models/ParkingArea";
import Coordinate from "../../models/Coordinate";

export const resolvers = {
  Mutation: {
    editParkingArea: async (_, { id, name, coordinates }, { user }) => {
      console.log(coordinates);
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

      const coords = await coordinatesRepository.find({
        where: { parkingAreaId: id }
      });
      coordinates.forEach(async (c, i) => {
        console.log(coords[i]);
        coords[i].latitude = parseFloat(c.latitude);
        coords[i].longitude = parseFloat(c.longitude);
        await connection.manager.save(coords[i]);
      });

      return parkingArea;
    }
  }
};
