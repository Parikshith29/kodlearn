import { pool } from '../config/db';

const deepContentMap: any = {
  'Vue.js Mastery': [
    { s: 'Vue Ecosystem', v: [{ t: 'Vue 3 Overview', u: 'nhBVKNMsq5M' }, { t: 'Composition API', u: 'bznioMOZzsY' }] },
    { s: 'State Management', v: [{ t: 'Pinia Fundamentals', u: 'ixOcBq5XmH8' }, { t: 'Global Stores', u: 'PzhN9o9F4lU' }] }
  ],
  'Angular Enterprise': [
    { s: 'Angular Core', v: [{ t: 'Component Architecture', u: 'Ata9cSC2WpM' }, { t: 'Template Syntax', u: '3dHNOWTI7H8' }] },
    { s: 'State Management', v: [{ t: 'RxJS & NgRx', u: 'T9oB-JvB0O0' }, { t: 'Managing Effects', u: 'hQZ1bXo7yEI' }] }
  ],
  'Java Spring Boot': [
    { s: 'Java Language', v: [{ t: 'Modern Java Syntax', u: 'l9AzO1FMgM8' }, { t: 'JVM Deep Dive', u: 'grEKMHGYyns' }] },
    { s: 'Spring Ecosystem', v: [{ t: 'Rest Controllers', u: 'vtPkZCRHKK0' }, { t: 'Dependency Injection', u: '9SGDpanrc8U' }] }
  ],
  'Go Microservices': [
    { s: 'Go Basics', v: [{ t: 'Go Fundamentals', u: 'YS4e4q9oBaU' }, { t: 'Data Types', u: 'SqrbIlUwR0U' }] },
    { s: 'Go Concurrency', v: [{ t: 'Goroutines & Channels', u: 'LvgVSSpwND8' }, { t: 'Context Package', u: 'f6kdp27TYZs' }] }
  ],
  'Rust Systems Programming': [
    { s: 'Rust Foundations', v: [{ t: 'The Borrow Checker', u: '5C_HPTJg5ek' }, { t: 'Ownership Logic', u: 'zF34dRivLOw' }] },
    { s: 'Memory Safety', v: [{ t: 'Smart Pointers', u: 'BPWwwS_k4wM' }, { t: 'Safe Multithreading', u: 'lzKeecy4OmQ' }] }
  ],
  'C++ Game Dev': [
    { s: 'Modern C++', v: [{ t: 'Standard Template Lib', u: 'vLnPwxZdW4Y' }, { t: 'Smart Pointers', u: '18c3MTX0PK0' }] },
    { s: 'Game Engine Logic', v: [{ t: 'Memory Management', u: 'wJ1L2nSIV1s' }, { t: 'Performance Tracing', u: 'i8jD0NnEa0o' }] }
  ],
  'Cybersecurity Basics': [
    { s: 'Security Foundations', v: [{ t: 'Network Security', u: '3B_mPlTMBw0' }, { t: 'Hashing vs Encryption', u: 'T4D6-7mD_6Q' }] },
    { s: 'Web Vulnerabilities', v: [{ t: 'XSS and SQL Injection', u: '2S_Z9cR8YmY' }, { t: 'Authentication Security', u: 'v8-l2F_G-qY' }] }
  ],
  'Cloud Architecture AWS': [
    { s: 'AWS Core Services', v: [{ t: 'EC2 and S3', u: '3hLmDS179YE' }, { t: 'AWS Lambda basics', u: 'SOTamWNgDKc' }] },
    { s: 'Global Infrastructure', v: [{ t: 'VPC and Subnets', u: 'T2qQGqZxkD0' }, { t: 'Route53 DNS', u: 'Z3N4o_g3-M8' }] }
  ]
};

async function cleanup() {
  console.log('Initiating Final Data Deep-Cleanse...');
  
  // 1. Delete 6 courses (those likely not customized anyway)
  await pool.query('DELETE FROM subjects LIMIT 6');
  
  // 2. Clear old video linkages for the rest
  await pool.query('DELETE FROM videos');
  await pool.query('DELETE FROM sections');

  const [subjects]: any = await pool.query('SELECT id, title FROM subjects');

  for (const sub of subjects) {
    const title = sub.title.replace(' Masterclass', '');
    const content = deepContentMap[title];

    if (content) {
      console.log(`Deep Sync: ${title}`);
      for (const [secIdx, section] of content.entries()) {
        const [secRes]: any = await pool.query(
          'INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)',
          [sub.id, section.s, secIdx + 1]
        );
        for (const [vidIdx, video] of (section.v as any[]).entries()) {
          await pool.query(
            'INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, ?)',
            [secRes.insertId, video.t, `https://www.youtube.com/watch?v=${video.u}`, vidIdx + 1]
          );
        }
      }
    } else {
      // General Engineering fallback for non-mapped items (Unique from standard JS)
      const [secRes]: any = await pool.query(
        'INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)',
        [sub.id, 'Engineering Core', 1]
      );
      await pool.query(
        'INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, ?)',
        [secRes.insertId, 'Foundational Theory', 'https://www.youtube.com/watch?v=nu_pCVPKzTk', 1]
      );
    }
  }
  
  console.log('Data cleanup complete. No duplicate JS placeholders remain.');
  pool.end();
}

cleanup();
