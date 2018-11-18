/* eslint import/no-dynamic-require: 0 global-require: 0 */
import path from "path";
import fs from "fs";
import glob from "glob";

import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";

/**
 * Generates type definitions and resolvers from filesystem
 * */
export default () => {
  const pathToModules = path.join(__dirname, "../modules");

  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(schema => fs.readFileSync(schema, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
};
