import { rule } from "graphql-shield";
import { getConnection } from "typeorm";
import User from "../../models/User"

export default rule()(async (_, __, { user }) => {
  if (!user) {
    return false
  }

  // Get logged in user and its roles from the database.
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  const currentUser = await userRepository.findOne({
    where: { id: user.id },
    relations: ["roles"]
  });

  // If user is a parking owner, pass the check.
  if (currentUser.roles[0].name == "ParkingOwner") {
    return true;
  } else {
    return false;
  }
});
