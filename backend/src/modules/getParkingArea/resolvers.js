import { getConnection } from "typeorm";
import ParkingArea from "../../models/ParkingArea";

export const resolvers = {
  Query: {
    getParkingArea: async (_, args, { user }) => {
      const connection = getConnection();
      const parkingAreaRepository = connection.getRepository(ParkingArea);

      const parkingArea = await parkingAreaRepository.findOne({
        where: { id: args.id, ownerId: user.id },
        relations: ["rates", "owner", "coordinates"]
      });
      return parkingArea;
    }
  }
};
