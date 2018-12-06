import User from "../../models/User";
import {getConnection} from "typeorm";
import ParkingArea from "../../models/ParkingArea";

export const resolvers = {
  Query: {
    getParkingAreas: async (_, args, { user }) => {
      let paData = ""
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const parkingAreaRepository = connection.getRepository(ParkingArea);

      const loggedInUser = await userRepository.findOne({
        where: { id: user.id }
      });

      paData = $filter('filter')(parkingAreaRepository.ParkingArea, {owner: loggedInUser});

     
      return paData
    },
  },
};
