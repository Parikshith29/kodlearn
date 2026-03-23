import { pool } from '../config/db';

async function seed() {
  console.log('Seeding database with test modules...');

  try {
    // 1. Insert Subject
    const [subRes]: any = await pool.query(`
      INSERT INTO subjects (title, description, thumbnail_url) 
      VALUES (
        'Advanced React & Next.js Engineering', 
        'Master the Next.js App Router, Server Components, and high-performance state management patterns to build scalable enterprise web applications.',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
      )
    `);
    const subjectId = subRes.insertId;

    // 2. Insert Sections
    const [sec1Res]: any = await pool.query(`INSERT INTO sections (subject_id, title, order_index) VALUES (?, 'Core Architecture Foundation', 1)`, [subjectId]);
    const sec1Id = sec1Res.insertId;

    const [sec2Res]: any = await pool.query(`INSERT INTO sections (subject_id, title, order_index) VALUES (?, 'Complex UI Interactions', 2)`, [subjectId]);
    const sec2Id = sec2Res.insertId;

    // 3. Insert Videos
    await pool.query(`INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, 'React JS Crash Course', 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', 1)`, [sec1Id]);
    await pool.query(`INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, 'Next.js App Router Masterclass', 'https://www.youtube.com/watch?v=SmpjE_Hn_sQ', 2)`, [sec1Id]);
    
    await pool.query(`INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, 'Zustand State Management', 'https://www.youtube.com/watch?v=VZIAOSeuvnc', 1)`, [sec2Id]);
    await pool.query(`INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, 'Framer Motion Animations', 'https://www.youtube.com/watch?v=zVbQkEE1Huk', 2)`, [sec2Id]);

    console.log('Successfully seeded KodLearn Database!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    pool.end();
  }
}

seed();
