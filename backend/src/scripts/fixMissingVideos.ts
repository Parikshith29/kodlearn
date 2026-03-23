import { pool } from '../config/db';

async function fix() {
  console.log('Fixing disconnected topic videos and missing React videos...');
  try {
    const [subjects]: any = await pool.query('SELECT * FROM subjects');
    
    for (const sub of subjects) {
      if (sub.title.includes('React')) {
        // Fix missing react videos
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=LlvBzyy-558', title='React Hooks Complete Guide' WHERE title LIKE '%Context API%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=w7ejDZ8SWv8', title='Advanced State Management' WHERE title LIKE '%useReducer%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
      }
      else if (sub.title.includes('Git')) {
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=SWYqp7iY_Tc', title='Advanced Git Branching' WHERE title LIKE '%JavaScript%' AND title LIKE '%Git%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=SWYqp7iY_Tc', title='Git Workflows for Teams' WHERE title LIKE '%JavaScript%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
      }
      else if (sub.title.includes('TypeScript')) {
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=d56mG7DezGs', title='TypeScript with Next.js Application' WHERE title LIKE '%JavaScript%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=ahCwqrYpIuM', title='Advanced TypeScript Features & Generics' WHERE title LIKE '%React%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
      }
      else if (sub.title.includes('Tailwind')) {
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=UBOj6rqRUME', title='Tailwind CSS Best Practices' WHERE title LIKE '%JavaScript%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
      }
      else if (sub.title.includes('Algorithms')) {
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=8hly31xKli0', title='Graphs and Trees Implementation' WHERE title LIKE '%JavaScript%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
      }
      else if (sub.title.includes('Node')) {
        await pool.query("UPDATE videos SET youtube_url='https://www.youtube.com/watch?v=Oe421EPjeBE', title='Express Router & Middleware Architecture' WHERE title LIKE '%JavaScript%' AND section_id IN (SELECT id FROM sections WHERE subject_id = ?)", [sub.id]);
      }
    }
    console.log('Done mapping appropriate videos!');
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
fix();
