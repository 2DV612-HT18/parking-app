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
    entities: ["src/entities/**/*.js"],
    migrations: ["src/migrations/**/*.js"],
    subscribers: ["src/subscribers/**/*.js"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers"
    }
  }
];
