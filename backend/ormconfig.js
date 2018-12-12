module.exports = [
  {
    name: "development",
    type: "postgres",
    host: "db",
    username: process.env.POSTGRES_USER, // "development",
    password: process.env.POSTGRES_PASSWORD, // "example",
    database: process.env.POSTGRES_DB, // "postgres",
    port: 5432,
    synchronize: true,
    logging: true,
    entities: [process.env.ORM_ENTITIES_PROD || "src/entities/**/*.js"],
    migrations: [process.env.ORM_MIGRATIONS_PROD || "src/migrations/**/*.js"],
    subscribers: [
      process.env.ORM_SUBSCRIBERS_PROD || "src/subscribers/**/*.js"
    ],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers"
    }
  },
  {
    name: "production",
    type: "postgres",
    host: "db",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
    synchronize: true,
    logging: false,
    cache: true,
    entities: ["dist/entities/**/*.js"],
    migrations: ["dist/migrations/**/*.js"],
    subscribers: ["dist/subscribers/**/*.js"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers"
    }
  }
];
