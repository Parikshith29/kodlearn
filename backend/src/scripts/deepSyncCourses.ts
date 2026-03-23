import { pool } from '../config/db';

const subjectsContent: any = {
  'React Context API': [
    { section: 'Core Concepts', videos: [
      { title: 'Understanding Context', url: 'https://www.youtube.com/watch?v=5LrDIWkK-n8' },
      { title: 'Context vs Props', url: 'https://www.youtube.com/watch?v=35lXWvCuM8o' }
    ]},
    { section: 'Advanced Implementation', videos: [
      { title: 'Custom Provider Patterns', url: 'https://www.youtube.com/watch?v=6RhOzQciVwI' },
      { title: 'Performance Optimization', url: 'https://www.youtube.com/watch?v=fPshm0F-7b0' }
    ]}
  ],
  'Advanced Node.js': [
    { section: 'Engine Architecture', videos: [
      { title: 'The Event Loop Deep Dive', url: 'https://www.youtube.com/watch?v=PNa9OM6w97E' },
      { title: 'Streams and Buffers', url: 'https://www.youtube.com/watch?v=48SDe9Z-G1U' }
    ]},
    { section: 'Microservices with Node', videos: [
      { title: 'Communication Protocols', url: 'https://www.youtube.com/watch?v=WppL3-G2A2k' },
      { title: 'Scaling Node instances', url: 'https://www.youtube.com/watch?v=P7f-V-a2F6U' }
    ]}
  ],
  'Python Data Science': [
    { section: 'Data Manipulation', videos: [
      { title: 'Pandas for Analysis', url: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
      { title: 'Data Cleaning Workflow', url: 'https://www.youtube.com/watch?v=6_2LZEB960g' }
    ]},
    { section: 'Mathematical Foundations', videos: [
      { title: 'NumPy Vectorization', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI' },
      { title: 'Linear Algebra basics', url: 'https://www.youtube.com/watch?v=8ni7A_Y6w8Q' }
    ]}
  ],
  'Machine Learning 101': [
    { section: 'Supervised Learning', videos: [
      { title: 'Regression Models', url: 'https://www.youtube.com/watch?v=KzV2RjT5-gM' },
      { title: 'Classification Algorithms', url: 'https://www.youtube.com/watch?v=reUZRyXxUs4' }
    ]},
    { section: 'Preprocessing & Validation', videos: [
      { title: 'Feature Engineering', url: 'https://www.youtube.com/watch?v=d_qu7T62T_o' },
      { title: 'Model Evaluation Metrics', url: 'https://www.youtube.com/watch?v=0pP4EwWJgIU' }
    ]}
  ],
  'Docker for Developers': [
    { section: 'Container Basics', videos: [
      { title: 'Docker Architecture', url: 'https://www.youtube.com/watch?v=mDpdO_3-yA4' },
      { title: 'Writing Dockerfiles', url: 'https://www.youtube.com/watch?v=0fSHe83A090' }
    ]},
    { section: 'Multi-Container Apps', videos: [
      { title: 'Docker Compose Guide', url: 'https://www.youtube.com/watch?v=HG6yLPrIcW8' },
      { title: 'Volume Networking', url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI' }
    ]}
  ],
  'Kubernetes Clusters': [
    { section: 'K8s Foundations', videos: [
      { title: 'Pods vs Deployments', url: 'https://www.youtube.com/watch?v=as_ZST6_m-A' },
      { title: 'Scheduling Logic', url: 'https://www.youtube.com/watch?v=vV9WpsP09pE' }
    ]},
    { section: 'Production Clusters', videos: [
      { title: 'Ingress Controllers', url: 'https://www.youtube.com/watch?v=H74vR8tI220' },
      { title: 'Scalability & HPA', url: 'https://www.youtube.com/watch?v=Yf7-a5S3v10' }
    ]}
  ],
  'GraphQL APIs': [
    { section: 'Schema Design', videos: [
      { title: 'Types and Queries', url: 'https://www.youtube.com/watch?v=ed8SzALpx1Q' },
      { title: 'Mutations Simplified', url: 'https://www.youtube.com/watch?v=ZQL7tL2S0oQ' }
    ]},
    { section: 'Server Implementation', videos: [
      { title: 'Apollo Server Setup', url: 'https://www.youtube.com/watch?v=XhY7HAt1G0k' },
      { title: 'Resolver Efficiency', url: 'https://www.youtube.com/watch?v=VjXb_Zasizo' }
    ]}
  ],
  'Web3 & Blockchain': [
    { section: 'Blockchain Theory', videos: [
      { title: 'Consensus Algorithms', url: 'https://www.youtube.com/watch?v=SSo_EIwHSd4' },
      { title: 'Smart Contract Logic', url: 'https://www.youtube.com/watch?v=ZE2HxVaLPas' }
    ]},
    { section: 'DApp Engineering', videos: [
      { title: 'Ethers.js provider', url: 'https://www.youtube.com/watch?v=yk7nVp5vChI' },
      { title: 'IPFS Storage', url: 'https://www.youtube.com/watch?v=BA2awS982pM' }
    ]}
  ],
  'Git Mastery': [
    { section: 'The Git Engine', videos: [
      { title: 'Snapshots vs Diffs', url: 'https://www.youtube.com/watch?v=PNa9OM6w97E' },
      { title: 'Internal Indexing', url: 'https://www.youtube.com/watch?v=P7f-V-a2F6U' }
    ]},
    { section: 'Workflow Mastery', videos: [
      { title: 'Rebase vs Merge', url: 'https://www.youtube.com/watch?v=zOn7I66wUoY' },
      { title: 'Cherry Picking magic', url: 'https://www.youtube.com/watch?v=jS5-nC9UjDk' }
    ]}
  ],
  'Tailwind CSS Advanced': [
    { section: 'The Design Engine', videos: [
      { title: 'JIT Compilation', url: 'https://www.youtube.com/watch?v=mSC6GwizOag' },
      { title: 'Directive configuration', url: 'https://www.youtube.com/watch?v=MAtaT8BZEao' }
    ]},
    { section: 'Premium UI building', videos: [
      { title: 'Dark Mode logic', url: 'https://www.youtube.com/watch?v=q6I9E9gJ8mE' },
      { title: 'Custom Plugin engine', url: 'https://www.youtube.com/watch?v=KzE_z9W8y9Q' }
    ]}
  ],
  'JavaScript Algorithms': [
    { section: 'Complexity Analysis', videos: [
      { title: 'Big O Notation', url: 'https://www.youtube.com/watch?v=itnHiHgHU88' },
      { title: 'Recursion Depth', url: 'https://www.youtube.com/watch?v=LteNqj4DFD8' }
    ]},
    { section: 'Classic Structures', videos: [
      { title: 'Linked List traversal', url: 'https://www.youtube.com/watch?v=H5i16qH04AE' },
      { title: 'Hash Map efficiency', url: 'https://www.youtube.com/watch?v=knVpvfQvNis' }
    ]}
  ]
};

async function sync() {
  console.log('Initiating Precise Deep-Search Content Matching...');
  
  // Clear old stale data
  await pool.query('DELETE FROM videos');
  await pool.query('DELETE FROM sections');
  
  const [subjects]: any = await pool.query('SELECT id, title FROM subjects');
  
  for (const sub of subjects) {
    const title = sub.title.replace(' Masterclass', '');
    const content = subjectsContent[title];
    
    if (content) {
      console.log(`Matching: ${title}`);
      for (const [secIdx, section] of content.entries()) {
        const [secRes]: any = await pool.query(
          'INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)',
          [sub.id, section.section, secIdx + 1]
        );
        
        for (const [vidIdx, video] of (section.videos as any[]).entries()) {
          await pool.query(
            'INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, ?)',
            [secRes.insertId, video.title, video.url, vidIdx + 1]
          );
        }
      }
    } else {
      // Fallback for titles not explicitly in map
      const [secRes]: any = await pool.query(
        'INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, 1)',
        [sub.id, 'Standard Curriculum']
      );
      await pool.query(
        'INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, ?, ?, 1)',
        [secRes.insertId, 'Core Foundation', 'https://www.youtube.com/watch?v=PkZNo7MFNFg', 1]
      );
    }
  }
  
  console.log('Successfully applied Precise Course Logic to ALL modules.');
  pool.end();
}

sync();
