import { resolve } from "node:path";
import database from "infra/database.js";
import { runner } from "node-pg-migrate";
import { ServiceError } from "infra/errors.js";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve(process.cwd(), "infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

async function createClient() {
  try {
    const dbClient = await database.getNewClient();
    return dbClient;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Connection error with the database.",
      cause: error,
    });

    throw serviceErrorObject;
  }
}

async function listPendingMigrations() {
  const dbClient = await createClient();

  try {
    const pendingMigrations = await runner({
      ...defaultMigrationOptions,
      dbClient,
    });

    return pendingMigrations;
  } finally {
    await dbClient.end();
  }
}

async function runPendingMigrations() {
  const dbClient = await createClient();

  try {
    const migratedMigrations = await runner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
