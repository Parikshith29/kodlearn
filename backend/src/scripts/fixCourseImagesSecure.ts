import { pool } from '../config/db';

async function update() {
  console.log('UPDATING COURSE IMAGES WITH VERIFIED REDIRECTS...');
  try {
    // Using direct Unsplash Source format which is more robust
    const dockerImg = 'https://images.unsplash.com/photo-1605745341112-85968b193ef5?auto=format&fit=crop&q=80&w=800';
    const pythonImg = 'https://images.unsplash.com/photo-1551288049-bbbda3e66481?auto=format&fit=crop&q=80&w=800';
    const reactImg = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800';

    await pool.query('UPDATE subjects SET thumbnail_url = ? WHERE title LIKE ?', [dockerImg, '%Docker%']);
    await pool.query('UPDATE subjects SET thumbnail_url = ? WHERE title LIKE ?', [pythonImg, '%Python for Data%']);
    await pool.query('UPDATE subjects SET thumbnail_url = ? WHERE title LIKE ?', [reactImg, '%React%']);

    console.log('✓ Applied robust Unsplash URLs to subjects.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

update();
