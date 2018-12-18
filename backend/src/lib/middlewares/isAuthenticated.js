import { rule } from "graphql-shield";

export default rule()(async (_, __, { user }) => !!user);
