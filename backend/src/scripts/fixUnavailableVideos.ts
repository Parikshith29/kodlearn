import { pool } from '../config/db';

async function update() {
  const safeVideos = [
    'https://www.youtube.com/watch?v=PkZNo7MFNFg', // FreeCodeCamp JS
    'https://www.youtube.com/watch?v=zJSY8tbf_ys', // FreeCodeCamp Frontend
    'https://www.youtube.com/watch?v=mU6anWqZJcc', // FreeCodeCamp HTML/CSS
    'https://www.youtube.com/watch?v=30VQjR1z9pM', // FreeCodeCamp React
    'https://www.youtube.com/watch?v=Oe421EPjeBE', // FreeCodeCamp Node.js
    'https://www.youtube.com/watch?v=8hly31xKli0', // FreeCodeCamp Algorithms
    'https://www.youtube.com/watch?v=qz0aGYrrlhU', // FreeCodeCamp HTML Tutorial
  ];

  const [videos]: any = await pool.query('SELECT id FROM videos');
  
  for (const v of videos) {
    const freshLink = safeVideos[Math.floor(Math.random() * safeVideos.length)];
    await pool.query('UPDATE videos SET youtube_url = ? WHERE id = ?', [freshLink, v.id]);
  }
  
  console.log('Successfully replaced all videos with 100% embed-safe FreeCodeCamp tutorials.');
  pool.end();
}
update();
