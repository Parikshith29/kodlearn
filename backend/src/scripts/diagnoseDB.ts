import { pool } from '../config/db';

async function diagnose() {
  try {
    const [rows]: any = await pool.query('SHOW COLUMNS FROM users');
    console.log(rows);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

diagnose();
