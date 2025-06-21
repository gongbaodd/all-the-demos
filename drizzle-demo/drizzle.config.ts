import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle', // Directory for migration files
  driver: 'better-sqlite',
  dbCredentials: {
    // This URL refers to the database file inside the Docker container's volume.
    // Make sure it matches the path used in src/db/index.ts
    url: './data/sqlite.db',
  },
  verbose: true,
  strict: true,
});