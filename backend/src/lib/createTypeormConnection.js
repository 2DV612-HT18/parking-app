import { createConnection, getConnectionOptions } from "typeorm";

/**
 * Get connection options from ormconfig.js to create typeorm connection.
 */
export default async connectionName => {
  const connectionOptions = await getConnectionOptions(connectionName);
  return createConnection({ ...connectionOptions, name: "default" });
};
