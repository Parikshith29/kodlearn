import { pool } from '../config/db';

async function update() {
  console.log('UPDATING MISSING COURSE IMAGES...');
  try {
    // Docker Image
    await pool.query(
      'UPDATE subjects SET thumbnail_url = ? WHERE title LIKE ?',
      ['https://images.unsplash.com/photo-1605745341112-85968b193ef5?w=800', '%Docker%']
    );
    
    // Python Data Science Image
    await pool.query(
      'UPDATE subjects SET thumbnail_url = ? WHERE title LIKE ?',
      ['https://images.unsplash.com/photo-1551288049-bbbda3e66481?w=800', '%Python for Data%']
    );

    console.log('✓ Successfully applied premium Unsplash images to Docker and Python courses.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

update();
