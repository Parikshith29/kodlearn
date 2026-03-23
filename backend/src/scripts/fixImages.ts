import { pool } from '../config/db';

async function update() {
  const images = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
  ];

  const [subjects]: any = await pool.query('SELECT id FROM subjects');
  
  for (const sub of subjects) {
    const img = images[Math.floor(Math.random() * images.length)];
    await pool.query('UPDATE subjects SET thumbnail_url = ? WHERE id = ?', [img, sub.id]);
  }
  console.log('Images fixed.');
  pool.end();
}
update();
