import { getConnection } from "typeorm";
import ParkingArea from "../../models/ParkingArea";
import User from "../../models/User";
import Coordinate from "../../models/Coordinate";

export const resolvers = {
  Mutation: {
    editParkingArea: async (_, { id, name, coordinates }, { user }) => {
      console.log(coordinates);
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const parkingAreaRepository = connection.getRepository(ParkingArea);

      const loggedInUser = await userRepository.findOne({
        where: { id: user.id }
      });
      const parkingArea = await parkingAreaRepository.findOne({
        where: { id: id, ownerId: user.id },
        relations: ["coordinates"]
      });
      
      if (!parkingArea) {
        return false;
      }

      await connection.manager.remove(parkingArea);

      parkingArea.name = name;

      await connection.manager.save(parkingArea);

      coordinates.forEach(async c => {
        const cordinate = new Coordinate(
          parkingArea,
          parseFloat(c.latitude),
          parseFloat(c.longitude)
        );
        await connection.manager.save(cordinate);
      });

      return true;
    }
  }
};
