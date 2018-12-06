import { getConnection } from "typeorm";
import ParkingArea from "../../models/ParkingArea";
import User from "../../models/User";
import Coordinate from "../../models/Coordinate";

export const resolvers = {
  Mutation: {
    addParkingArea: async (_, { name, coordinates }, { user }) => {
      console.log(coordinates);
      const connection = getConnection();
      const userRepository = connection.getRepository(User);

      const loggedInUser = await userRepository.findOne({
        where: { id: user.id }
      });

      const parkingArea = new ParkingArea(0, name, loggedInUser);

      await connection.manager.save(parkingArea);

      const coordinateList = [];

      coordinates.forEach(async c => {
        const cordinate = new Coordinate(parkingArea, c.latitude, c.longitude);
        await connection.manager.save(cordinate);

        coordinateList.push(cordinate);
      });

      return parkingArea;
    }
  }
};
