import { pool } from '../config/db';

const logos: Record<string, string> = {
  '%React%':             'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  '%Python%':            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  '%Node%':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  '%Git%':               'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  '%Next.js%':           'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  '%Docker%':            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  '%TypeScript%':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  '%Tailwind%':          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  '%Algorithm%':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  '%Full Stack%':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
};

async function update() {
  console.log('APPLYING TECH LOGOS...');
  try {
    for (const [pattern, url] of Object.entries(logos)) {
      await pool.query('UPDATE subjects SET thumbnail_url = ? WHERE title LIKE ?', [url, pattern]);
    }
    console.log('ALL LOGOS UPDATED.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

update();
