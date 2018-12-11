import {getConnection} from "typeorm";
import ParkingArea from "../../models/ParkingArea";

export const resolvers = {
  Mutation: {
    removeParkingArea: async (_, args, { user }) => {
      const connection = getConnection();
      const parkingAreaRepository = connection.getRepository(ParkingArea);

      const parkingArea = await parkingAreaRepository.findOne({
        where: { id: args.id, ownerId: user.id }
      });
      
      if(parkingArea != null){
        connection.manager.remove(parkingArea);
        return true;
      }

      return false;
    },
  },
};

