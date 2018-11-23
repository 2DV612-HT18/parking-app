import { rule } from "graphql-shield";
import { getConnection } from "typeorm";
import User from "../../models/User";

export default rule()(async (_, __, context) => {
  const userId = context.user.id;
  const connection = getConnection();
  const userRepository = connection.getRepository(User);

  return !!userRepository.findOne({ where: { id: userId } });
});
