import { pool } from '../config/db';

const topicsMap: any = {
  'react': [{ s: 'React Architecture', v: ['bMknfKXIFA8', 'w7ejDZ8SWv8'] }, { s: 'Advanced Patterns', v: ['SmOQ9VqcwBc', 'QFaFIcGhPoM'] }],
  'next': [{ s: 'App Router', v: ['wm5gMKuwSYk', 'SmpjE_Hn_sQ'] }, { s: 'Server Actions', v: ['NgayZAuTgwM', 'R7A5vD8EZCM'] }],
  'node': [{ s: 'Node Architecture', v: ['ENrzD9HAZK4', 'TlB_eWDSMt4'] }, { s: 'Express APIs', v: ['L72fhGm1ncE', 'SccSCuHhOw0'] }],
  'python': [{ s: 'Python Core', v: ['kqtD5dpn9C8', 'rfscVS0vtbw'] }, { s: 'Data Engineering', v: ['r-uOLQCEZEw', 'LHBE6Q9XlzI'] }],
  'machine': [{ s: 'ML Concepts', v: ['Gv9_4yMHFhI', 'i_LwzRmAEN0'] }, { s: 'Neural Nets', v: ['aircAruvnKk', 'IHZwWFHWa-w'] }],
  'docker': [{ s: 'Containerization Basics', v: ['gAkwW2tuIqE', 'fqMOXVR9hNM'] }, { s: 'Orchestration', v: ['pTFZFxd4hOI', 'Qw9zlzXhJjQ'] }],
  'kubernetes': [{ s: 'K8s Architecture', v: ['X48VuDVv0do', 'd6WC5n9G_sM'] }, { s: 'Deployments', v: ['1xg-MqGzEIM', 'HptG4BIIFj8'] }],
  'vue': [{ s: 'Vue Ecosystem', v: ['nhBVKNMsq5M', 'bznioMOZzsY'] }, { s: 'Vuex & Pinia', v: ['ixOcBq5XmH8', 'PzhN9o9F4lU'] }],
  'angular': [{ s: 'Angular Core', v: ['Ata9cSC2WpM', '3dHNOWTI7H8'] }, { s: 'RxJS & NgRx', v: ['T9oB-JvB0O0', 'hQZ1bXo7yEI'] }],
  'java': [{ s: 'Java Language', v: ['l9AzO1FMgM8', 'grEKMHGYyns'] }, { s: 'Spring Boot', v: ['vtPkZCRHKK0', '9SGDpanrc8U'] }],
  'go': [{ s: 'Go Programming', v: ['YS4e4q9oBaU', 'SqrbIlUwR0U'] }, { s: 'Concurrency', v: ['LvgVSSpwND8', 'f6kdp27TYZs'] }],
  'rust': [{ s: 'Rust Fundamentals', v: ['5C_HPTJg5ek', 'zF34dRivLOw'] }, { s: 'Memory Safety', v: ['BPWwwS_k4wM', 'lzKeecy4OmQ'] }],
  'c++': [{ s: 'Modern C++', v: ['vLnPwxZdW4Y', '18c3MTX0PK0'] }, { s: 'Memory Management', v: ['wJ1L2nSIV1s', 'i8jD0NnEa0o'] }],
  'cloud': [{ s: 'Cloud Concepts', v: ['3hLmDS179YE', 'SOTamWNgDKc'] }, { s: 'Serverless Functions', v: ['T2qQGqZxkD0', 'Z3N4o_g3-M8'] }],
  'tailwind': [{ s: 'Tailwind Syntax', v: ['lCxcTsOHrjo', '1Rs2ND1ryYc'] }, { s: 'Building UIs', v: ['QHaz36TZG5Y', '1PnVor36_40'] }],
  'javascript': [{ s: 'JS Fundamentals', v: ['W6NZfCO5SIk', 'jS4aFq5-91M'] }, { s: 'Asynchronous Code', v: ['8aGhZQkoFbQ', 'ZYb_ZU8LNxs'] }],
  'default': [{ s: 'Course Introduction', v: ['nu_pCVPKzTk', 'zQnBQ4tB3ZA'] }, { s: 'Deep Dive', v: ['mDpwTtvlP9M', 'T3X3hZmU_OQ'] }]
};

async function fix() {
  await pool.query('DELETE FROM videos');
  await pool.query('DELETE FROM sections');
  const [subjects]: any = await pool.query('SELECT id, title FROM subjects');

  for (const sub of subjects) {
    const title = sub.title.toLowerCase();
    let matchKey = 'default';
    for (const key of Object.keys(topicsMap)) {
      if (title.includes(key)) {
        matchKey = key;
        break;
      }
    }
    const layout = topicsMap[matchKey];
    
    const [sec1]: any = await pool.query('INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, 1)', [sub.id, layout[0].s]);
    await pool.query('INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, 1)', [sec1.insertId, 'Getting Started', `https://www.youtube.com/watch?v=${layout[0].v[0]}`]);
    await pool.query('INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, 2)', [sec1.insertId, 'Core Concepts', `https://www.youtube.com/watch?v=${layout[0].v[1]}`]);

    const [sec2]: any = await pool.query('INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, 2)', [sub.id, layout[1].s]);
    await pool.query('INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, 1)', [sec2.insertId, 'Advanced Techniques', `https://www.youtube.com/watch?v=${layout[1].v[0]}`]);
    await pool.query('INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, 2)', [sec2.insertId, 'Project Integration', `https://www.youtube.com/watch?v=${layout[1].v[1]}`]);
  }
  
  console.log('Fixed subheadings and matched videos completely!');
  pool.end();
}
fix();
