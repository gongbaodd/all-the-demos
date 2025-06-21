import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Define the path to your SQLite database file
// When running in Docker, this path refers to the container's file system.
// The `sqlite_data` volume in docker-compose.yml will persist this file.
const dbPath = path.join(__dirname, '../../data/sqlite.db');

// Initialize better-sqlite3 database connection
const sqlite = new Database(dbPath);

// Initialize Drizzle ORM with the database connection and schema
export const db = drizzle(sqlite, { schema });

// Optional: Run migrations on startup (for development or simple apps)
// For production, you might run migrations as a separate step or a dedicated container.
// This is a simple `push` which automatically creates tables. For more control, use `migrate`.
async function initializeDb() {
    try {
        console.log(`Ensuring schema is up-to-date at ${dbPath}...`);
        // This `push` command will automatically create tables based on your schema if they don't exist
        // In a real application, you'd use `drizzle-kit migrate` for versioned migrations.
        // However, `push` is convenient for small examples.
        sqlite.exec(`
CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
);`
        );
        console.log('Database schema ensured.');
    } catch (error) {
        console.error('Failed to initialize database schema:', error);
    }
}

initializeDb();