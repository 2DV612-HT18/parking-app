import { getConnection } from "typeorm";
import ParkingArea from "../../models/ParkingArea";
import User from "../../models/User";

export const resolvers = {
  Mutation: {
    chooseParkingArea: async (_, args, { user }) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const parkingRepository = connection.getRepository(ParkingArea);
      const loggedInUser = await userRepository.findOne({
        where: { id: user.id },
        relations: ["currentParkingAreas"]
      });
      const selectedParkingArea = await parkingRepository.findOne({
        where: { id: args.id }
      });

      // If parking area wasn't found or if it already exists in currentParkingAreas, throw error
      if (!selectedParkingArea) {
        return [
          {
            path: "chooseParkingArea",
            message: "Selected parking area was not found."
          }
        ];
      } if (
        loggedInUser.currentParkingAreas.some(
          p => p.id === selectedParkingArea.id
        )
      ) {
        return [
          {
            path: "chooseParkingArea",
            message: "Parking area already in users list of current areas."
          }
        ];
      } 
        loggedInUser.currentParkingAreas.push(selectedParkingArea);
        connection.manager.save(loggedInUser);
      

      return null;
    }
  }
};
