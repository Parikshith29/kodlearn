import { pool } from '../config/db';

async function update() {
  const realVideos = [
    'https://www.youtube.com/watch?v=wm5gMKuwSYk', // Nextjs
    'https://www.youtube.com/watch?v=bMknfKXIFA8', // React
    'https://www.youtube.com/watch?v=ENrzD9HAZK4', // Node
    'https://www.youtube.com/watch?v=ahCwqrYpIuM', // TypeScript
    'https://www.youtube.com/watch?v=lCxcTsOHrjo', // Tailwind
    'https://www.youtube.com/watch?v=gAkwW2tuIqE', // Docker
    'https://www.youtube.com/watch?v=nu_pCVPKzTk', // General Web Dev
    'https://www.youtube.com/watch?v=zQnBQ4tB3ZA', // Array methods
    'https://www.youtube.com/watch?v=mDpwTtvlP9M'  // React Props
  ];

  const [videos]: any = await pool.query('SELECT id FROM videos');
  
  for (const v of videos) {
    const freshLink = realVideos[Math.floor(Math.random() * realVideos.length)];
    await pool.query('UPDATE videos SET youtube_url = ? WHERE id = ?', [freshLink, v.id]);
  }
  
  console.log('Successfully cleansed all mock meme videos and inserted real premium tutorial links!');
  pool.end();
}
update();
