
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema.js";

const { Pool } = pg;

export function createDbPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
  // Vercel/Neon için SSL desteği eklendi
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true // Neon DB için bu satır hayat kurtarır
  });
}

export function createDb(pool: pg.Pool) {
  return drizzle(pool, { schema });
}