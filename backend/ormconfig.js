module.exports = [
  {
    name: "development",
    type: "postgres",
    host: "db",
    username: "development",
    password: "example",
    database: "postgres",
    port: 5432,
    synchronize: true,
    logging: true,
    entities: [process.env.ORM_ENTITIES_PROD || "src/entities/**/*.js"],
    migrations: [process.env.ORM_MIGRATIONS_PROD || "src/migrations/**/*.js"],
    subscribers: [process.env.ORM_SUBSCRIBERS_PROD || "src/subscribers/**/*.js"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers"
    }
  }
];
