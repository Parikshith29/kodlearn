import { pool } from '../config/db';

async function update() {
  try {
    console.log("Adding categories...");
    await pool.query('ALTER TABLE subjects ADD COLUMN category VARCHAR(100) DEFAULT "Technology"');
  } catch (e: any) {
    if (e.code !== 'ER_DUP_FIELDNAME') console.error(e);
  }
  
  const [subjects]: any = await pool.query('SELECT id FROM subjects');
  const categories = ['Frontend Engineering', 'Backend Systems', 'AI & Data Science', 'DevOps & Cloud', 'Mobile Development', 'UI/UX Design'];
  
  for (const sub of subjects) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const img = `https://picsum.photos/seed/${sub.id}/800/600`;
    await pool.query('UPDATE subjects SET thumbnail_url = ?, category = ? WHERE id = ?', [img, cat, sub.id]);
  }
  console.log('Categories and thumbnail images successfully generated for all courses.');
  pool.end();
}
update();
