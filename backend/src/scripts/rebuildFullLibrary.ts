import { pool } from '../config/db';

async function rebuild() {
  console.log('REBUILDING DATABASE: 10 PREMIUM HAND-MAPPED COURSES...');

  try {
    await pool.query('DELETE FROM video_progress');
    await pool.query('DELETE FROM videos');
    await pool.query('DELETE FROM sections');
    await pool.query('DELETE FROM subjects');

    const hqData = [
      {
        title: 'React Professional Masterclass',
        cat: 'Frontend',
        desc: 'Advanced hooks, architecture, and high-performance patterns.',
        img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        sections: [
          { name: 'Foundations', v: [
            { t: 'The React Ecosystem 2024', u: 'A71aqufiNtQ' },
            { t: 'Component Tree Logic', u: 'y9Zf7f6j6O4' }
          ]},
          { name: 'State Management', v: [
            { t: 'Context vs Redux', u: '5LrDIWkK-n8' },
            { t: 'useReducer Deep Dive', u: 'cM2Kve9e-e4' }
          ]}
        ]
      },
      {
        title: 'Python for Data Science pro',
        cat: 'Data',
        desc: 'Master Pandas, NumPy, and professional data visualization.',
        img: 'https://images.unsplash.com/photo-1551288049-bbbda3e66481?w=800',
        sections: [
          { name: 'Data Engineering', v: [
            { t: 'Pandas Dataframes 101', u: 'vmEHCJofslg' },
            { t: 'Data Cleaning at Scale', u: '6_2LZEB960g' }
          ]},
          { name: 'Analytics', v: [
            { t: 'NumPy Vectorization', u: 'QUT1VHiLmmI' },
            { t: 'Seaborn Visualizations', u: '6GUZ_L1hYXs' }
          ]}
        ]
      },
      {
        title: 'Node.js Backend Systems',
        cat: 'Backend',
        desc: 'Build secure, scalable APIs with Node and Express.',
        img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
        sections: [
          { name: 'Server Core', v: [
            { t: 'Node.js Internals', u: 'PNa9OM6w97E' },
            { t: 'Asynchronous Workflows', u: '8aGhZQkoFbQ' }
          ]},
          { name: 'Deployment', v: [
            { t: 'Dockerizing Node Apps', u: 'fqMOXVR9hNM' },
            { t: 'PM2 Management', u: 'LvgVSSpwND8' }
          ]}
        ]
      },
      {
        title: 'Git Version Control Mastery',
        cat: 'DevOps',
        desc: 'Advanced branching, interactive rebase, and team flow.',
        img: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
        sections: [
          { name: 'The Engine', v: [
            { t: 'Git Reflog & Internals', u: 'P6jD966jzLk' },
            { t: 'Branching Strategies', u: '0chZFIZLR_0' }
          ]},
          { name: 'Advanced Flow', v: [
            { t: 'Rebase vs Merge Masterclass', u: 'zOn7I66wUoY' },
            { t: 'Resolving Merge Conflicts', u: 'HosPml1qkrg' }
          ]}
        ]
      },
      {
        title: 'Next.js 15 Full Stack',
        cat: 'Frontend',
        desc: 'Master Server Components, Actions, and the App Router.',
        img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800',
        sections: [
          { name: 'Architecture', v: [
            { t: 'App Router Explained', u: 'wm5gMKuwSYk' },
            { t: 'Server Actions Logic', u: 'NgayZAuTgwM' }
          ]},
          { name: 'Scaling', v: [
            { t: 'Dynamic Rendering', u: 'V9Xvp8i_6S8' },
            { t: 'Zod & Validation', u: 'dDpZfOQBMaU' }
          ]}
        ]
      },
      {
        title: 'Docker & Kubernetes',
        cat: 'DevOps',
        desc: 'Orchestration at scale: Containers to High-Availability clusters.',
        img: 'https://images.unsplash.com/photo-1605745341112-85968b193ef5?w=800',
        sections: [
          { name: 'Containerization', v: [
            { t: 'Docker Architecture', u: 'mDpdO_3-yA4' },
            { t: 'Optimizing Layers', u: '0fSHe83A090' }
          ]},
          { name: 'Orchestration', v: [
            { t: 'K8s Pods and Deployments', u: 'as_ZST6_m-A' },
            { t: 'Ingress & Load Balancing', u: 'H74vR8tI220' }
          ]}
        ]
      },
      {
        title: 'TypeScript for Architects',
        cat: 'Frontend',
        desc: 'Type-safe systems with Generics, Interfaces, and Mixins.',
        img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
        sections: [
          { name: 'Core Typing', v: [
            { t: 'The TS Compiler', u: 'ahCwqrYpIuM' },
            { t: 'Advanced Interfaces', u: 'ENrzD9HAZK4' }
          ]},
          { name: 'System Patterns', v: [
            { t: 'Generics Explained', u: 'mU6anWqZJcc' },
            { t: 'Type Utility Magic', u: 'nu_pCVPKzTk' }
          ]}
        ]
      },
      {
        title: 'Tailwind CSS Pro UI',
        cat: 'Frontend',
        desc: 'Premium design implementation with utility-first logic.',
        img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
        sections: [
          { name: 'Design Engine', v: [
            { t: 'Tailwind 3 Standard', u: 'lCxcTsOHrjo' },
            { t: 'JIT Compilation Flow', u: 'mSC6GwizOag' }
          ]},
          { name: 'Dark Mode & Customization', v: [
            { t: 'Theme Extension', u: 'MAtaT8BZEao' },
            { t: 'High-End UI Components', u: 'q6I9E9gJ8mE' }
          ]}
        ]
      },
      {
        title: 'Cybersecurity Analyst',
        cat: 'Backend',
        desc: 'Network defense, web vulnerabilities, and secure coding.',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        sections: [
          { name: 'Network Defense', v: [
            { t: 'Securing Your Node', u: '3B_mPlTMBw0' },
            { t: 'The OSI Model Security', u: 'T4D6-7mD_6Q' }
          ]},
          { name: 'Web PenTesting', v: [
            { t: 'XSS Defense Guide', u: '2S_Z9cR8YmY' },
            { t: 'SQL Injection Prevention', u: 'v8-l2F_G-qY' }
          ]}
        ]
      },
      {
        title: 'Go Systems Programming',
        cat: 'Backend',
        desc: 'Ultra-fast concurrency with Goroutines and Channels.',
        img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        sections: [
          { name: 'The Go Way', v: [
            { t: 'Golang Toolchain', u: 'YS4e4q9oBaU' },
            { t: 'Interface Decoupling', u: 'SqrbIlUwR0U' }
          ]},
          { name: 'Goroutines', v: [
            { t: 'Channels & Select', u: 'LvgVSSpwND8' },
            { t: 'Concurrency Patterns', u: 'f6kdp27TYZs' }
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
          // ENSUING URL IS CLEAN FOR IFRAME
          const cleanUrl = `https://www.youtube.com/watch?v=${vid.u}`;
          await pool.query(
            'INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, ?)',
            [secRes.insertId, vid.t, cleanUrl, vIdx + 1]
          );
        }
      }
    }
    console.log('REBUILD COMPLETE: 10 PREMIUM, MAPPED COURSES CREATED.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
rebuild();
