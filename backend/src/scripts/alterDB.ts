import { pool } from '../config/db';

async function alterDB() {
  try {
    console.log("Altering users table...");
    await pool.query("ALTER TABLE users ADD COLUMN first_name VARCHAR(255) DEFAULT ''");
    await pool.query("ALTER TABLE users ADD COLUMN last_name VARCHAR(255) DEFAULT ''");
    console.log("Successfully added first_name and last_name.");
  } catch (e: any) {
    if (e.code === 'ER_DUP_FIELDNAME') {
      console.log("Columns already exist.");
    } else {
      console.error(e);
    }
  } finally {
    await pool.end();
  }
}

alterDB();
