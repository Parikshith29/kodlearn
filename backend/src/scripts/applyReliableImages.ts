import { pool } from '../config/db';

// Using picsum.photos with seeds — 100% auth-free, always available
// Seed = deterministic image for the same keyword every time
const courseImages: Record<string, string> = {
  '%React%':             'https://picsum.photos/seed/react-js/800/450',
  '%Python for Data%':   'https://picsum.photos/seed/python-data/800/450',
  '%Node%':              'https://picsum.photos/seed/nodejs-api/800/450',
  '%Git%':               'https://picsum.photos/seed/git-devops/800/450',
  '%Next.js%':           'https://picsum.photos/seed/nextjs-15/800/450',
  '%Docker%':            'https://picsum.photos/seed/docker-container/800/450',
  '%TypeScript%':        'https://picsum.photos/seed/typescript-eng/800/450',
  '%Tailwind%':          'https://picsum.photos/seed/tailwind-css/800/450',
  '%Algorithm%':         'https://picsum.photos/seed/algorithms-ds/800/450',
  '%Full Stack%':        'https://picsum.photos/seed/fullstack-web/800/450',
};

async function update() {
  console.log('APPLYING GUARANTEED-WORKING COURSE IMAGES...');
  try {
    for (const [pattern, url] of Object.entries(courseImages)) {
      const [res]: any = await pool.query(
        'UPDATE subjects SET thumbnail_url = ? WHERE title LIKE ?',
        [url, pattern]
      );
      console.log(`✓ ${pattern.replace(/%/g, '')}: ${res.affectedRows} row(s) updated`);
    }
    console.log('ALL IMAGES UPDATED.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

update();
