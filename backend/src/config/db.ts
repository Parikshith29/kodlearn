import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const pool = mysql.createPool({
  uri: dbUrl,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
