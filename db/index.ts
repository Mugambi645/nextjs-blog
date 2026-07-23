import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Database connection string is missing');
}

// Uses HTTPS (Port 443) under the hood instead of TCP (Port 5432)
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });