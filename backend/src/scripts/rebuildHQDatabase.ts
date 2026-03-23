import { pool } from '../config/db';

async function cleanup() {
  console.log('Initiating Full Database Reconstruction...');
  
  try {
    // 1. Wipe everything to start fresh
    await pool.query('DELETE FROM video_progress');
    await pool.query('DELETE FROM videos');
    await pool.query('DELETE FROM sections');
    await pool.query('DELETE FROM subjects');
    
    // 2. Insert only 10 High-Quality, Verified Courses
    const hqSubjects = [
      ['React Masterclass', 'Frontend', 'Master the Context API, Hooks, and Advanced Performance.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'],
      ['Next.js 15 Masterclass', 'Frontend', 'Build production-ready apps with App Router and Server Actions.', 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800'],
      ['Node.js Backend Systems', 'Backend', 'Deep-dive into the Event Loop, Streams, and Microservices.', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800'],
      ['Python Data Science', 'Data', 'Manipulation with Pandas and Numerical Computing with NumPy.', 'https://images.unsplash.com/photo-1551288049-bbbda3e66481?w=800'],
      ['Machine Learning 101', 'Data', 'Supervised learning models and feature engineering foundations.', 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800'],
      ['Docker for Developers', 'DevOps', 'Containerizing applications and Multi-Container Compose.', 'https://images.unsplash.com/photo-1605745341112-85968b193ef5?w=800'],
      ['Kubernetes Clusters', 'DevOps', 'Orchestration at scale with Pods, Deployments, and Ingress.', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800'],
      ['Git Mastering', 'DevOps', 'Master Rebase, Cherry-picking, and the Git Engine internals.', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800'],
      ['Web3 & Blockchain', 'Frontend', 'Smart Contract logic and Decentralized App engineering.', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800'],
      ['Tailwind CSS Advanced', 'Frontend', 'Premium UI construction with JIT and Custom Plugins.', 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800']
    ];

    for (const [title, cat, desc, img] of hqSubjects) {
       const [subRes]: any = await pool.query(
         'INSERT INTO subjects (title, category, description, thumbnail_url) VALUES (?, ?, ?, ?)',
         [title, cat, desc, img]
       );
       const subId = subRes.insertId;

       // Add 2 Sections per course
       const [sec1]: any = await pool.query('INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)', [subId, "Foundations", 1]);
       const [sec2]: any = await pool.query('INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)', [subId, "Advanced Applications", 2]);

       // ADD VERIFIED videos (FreeCodeCamp - Embed-Friendly)
       const verifiedVideos = [
         { t: 'Intro to Topic', u: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', s: sec1.insertId },
         { t: 'Core Implementation', u: 'https://www.youtube.com/watch?v=30VQjR1z9pM', s: sec1.insertId },
         { t: 'Deep Dive Tutorial', u: 'https://www.youtube.com/watch?v=Oe421EPjeBE', s: sec2.insertId },
         { t: 'Practical Project', u: 'https://www.youtube.com/watch?v=qz0aGYrrlhU', s: sec2.insertId }
       ];

       for (const [idx, v] of verifiedVideos.entries()) {
         await pool.query(
           'INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, ?)',
           [v.s, v.t, v.u, idx + 1]
         );
       }
    }

    console.log('Success: Database Purged and Re-populated.');
  } catch (err) {
    console.error('Migration Failed:', err);
  } finally {
    pool.end();
  }
}

cleanup();
