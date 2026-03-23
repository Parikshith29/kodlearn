import { pool } from '../config/db';

async function rebuild() {
  console.log('REBUILDING DATABASE INDIVIDUALLY MAPPED CONTENT...');

  try {
    await pool.query('DELETE FROM video_progress');
    await pool.query('DELETE FROM videos');
    await pool.query('DELETE FROM sections');
    await pool.query('DELETE FROM subjects');

    const hqData = [
      {
        title: 'React Masterclass',
        cat: 'Frontend',
        desc: 'Advanced hooks, context API, and performance patterns.',
        img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        sections: [
          { name: 'Core Foundations', v: [
            { t: 'React Roadmap 2024', u: 'https://www.youtube.com/watch?v=PkZNo7MFNFg' },
            { t: 'The Virtual DOM', u: 'https://www.youtube.com/watch?v=7Yh1V99Kj9U' }
          ]},
          { name: 'State Mastery', v: [
            { t: 'Context API Full Guide', u: 'https://www.youtube.com/watch?v=5LrDIWkK-n8' },
            { t: 'useReducer Explained', u: 'https://www.youtube.com/watch?v=cM2Kve9e-e4' }
          ]}
        ]
      },
      {
        title: 'Python Data Science',
        cat: 'Data',
        desc: 'Pandas, NumPy, and data visualization techniques.',
        img: 'https://images.unsplash.com/photo-1551288049-bbbda3e66481?w=800',
        sections: [
          { name: 'Data Manipulation', v: [
            { t: 'Pandas in 10 Minutes', u: 'https://www.youtube.com/watch?v=_T8LGqJtuGc' },
            { t: 'NumPy for Scientists', u: 'https://www.youtube.com/watch?v=QUT1VHiLmmI' }
          ]},
          { name: 'Scientific Viz', v: [
            { t: 'Matplotlib Tutorial', u: 'https://www.youtube.com/watch?v=3Xc3CA655Y4' },
            { t: 'Seaborn Pro Tips', u: 'https://www.youtube.com/watch?v=6GUZ_L1hYXs' }
          ]}
        ]
      },
      {
        title: 'Node.js Backend',
        cat: 'Backend',
        desc: 'Build scalable APIs with Node and Express.',
        img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
        sections: [
          { name: 'Server Fundamentals', v: [
            { t: 'Node.js Event Loop', u: 'https://www.youtube.com/watch?v=PNa9OM6w97E' },
            { t: 'Asynchronous Patterns', u: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ' }
          ]},
          { name: 'API Security', v: [
            { t: 'JWT Authentication', u: 'https://www.youtube.com/watch?v=7Q17ubqLfaM' },
            { t: 'SQL Injection Defense', u: 'https://www.youtube.com/watch?v=2S_Z9cR8YmY' }
          ]}
        ]
      },
      {
        title: 'Git Mastery',
        cat: 'DevOps',
        desc: 'Advanced branching, rebase, and open source workflow.',
        img: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
        sections: [
          { name: 'Git Engine', v: [
            { t: 'Git Internals', u: 'https://www.youtube.com/watch?v=P6jD966jzLk' },
            { t: 'Rebase vs Merge', u: 'https://www.youtube.com/watch?v=0chZFIZLR_0' }
          ]},
          { name: 'Team Workflow', v: [
            { t: 'Pull Requests Guide', u: 'https://www.youtube.com/watch?v=8XG-nQ2v-f4' },
            { t: 'Resolving Conflicts', u: 'https://www.youtube.com/watch?v=HosPml1qkrg' }
          ]}
        ]
      },
      {
        title: 'Next.js 15 Pro',
        cat: 'Frontend',
        desc: 'Modern App Router, Server Components, and Actions.',
        img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800',
        sections: [
          { name: 'Architecture', v: [
            { t: 'App Router Crash Course', u: 'https://www.youtube.com/watch?v=wm5gMKuwSYk' },
            { t: 'Server vs Client', u: 'https://www.youtube.com/watch?v=NgayZAuTgwM' }
          ]},
          { name: 'Data Flow', v: [
            { t: 'Next.js Cache Engine', u: 'https://www.youtube.com/watch?v=V9Xvp8i_6S8' },
            { t: 'Forms & Actions', u: 'https://www.youtube.com/watch?v=dDpZfOQBMaU' }
          ]}
        ]
      }
    ];

    for (const sub of hqData) {
      const [sRes]: any = await pool.query(
        'INSERT INTO subjects (title, category, description, thumbnail_url) VALUES (?, ?, ?, ?)',
        [sub.title, sub.cat, sub.desc, sub.img]
      );
      const subId = sRes.insertId;
      
      for (const [sIdx, sec] of sub.sections.entries()) {
        const [secRes]: any = await pool.query(
          'INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)',
          [subId, sec.name, sIdx + 1]
        );
        for (const [vIdx, vid] of sec.v.entries()) {
          await pool.query(
            'INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, ?)',
            [secRes.insertId, vid.t, vid.u, vIdx + 1]
          );
        }
      }
    }
    console.log('REBUILD COMPLETE: 5 Perfect, Mapped Courses Created.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
rebuild();
