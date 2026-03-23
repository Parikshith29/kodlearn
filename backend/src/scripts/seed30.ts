import { pool } from '../config/db';

async function seed() {
  console.log('Seeding 30+ database modules...');

  try {
    const topics = [
      'React Context API', 'Advanced Node.js', 'Python Data Science', 'Machine Learning 101',
      'Docker for Developers', 'Kubernetes Clusters', 'GraphQL APIs', 'Web3 & Blockchain',
      'Vue.js Mastery', 'Angular Enterprise', 'Java Spring Boot', 'Go Microservices',
      'Rust Systems Programming', 'C++ Game Dev', 'Unreal Engine 5', 'Unity 3D',
      'iOS Swift', 'Android Kotlin', 'Flutter Cross-platform', 'React Native Labs',
      'Cybersecurity Basics', 'Ethical Hacking', 'Cloud Architecture AWS', 'Azure Fundamentals',
      'Google Cloud Pro', 'DevOps CI/CD', 'Git Mastery', 'Linux Administration',
      'Figma UI/UX', 'Tailwind CSS Advanced', 'CSS Grid & Flexbox', 'JavaScript Algorithms'
    ];

    for (let i = 0; i < topics.length; i++) {
        const title = topics[i];
        const [subRes]: any = await pool.query(
            "INSERT INTO subjects (title, description, thumbnail_url) VALUES (?, ?, ?)",
            [
                title + ' Masterclass',
                `A complete 4-week rigorous curriculum focused on mastering ${title} from zero to hero.`,
                ''
            ]
        );
        const subjectId = subRes.insertId;

        const [secRes]: any = await pool.query("INSERT INTO sections (subject_id, title, order_index) VALUES (?, 'Introduction & Basics', 1)", [subjectId]);
        
        await pool.query("INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, 'Welcome to the Course', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 1)", [secRes.insertId]);
        await pool.query("INSERT INTO videos (section_id, title, youtube_url, order_index) VALUES (?, 'Foundation Syntax', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 2)", [secRes.insertId]);
    }

    console.log('Successfully seeded 30+ modules!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    pool.end();
  }
}

seed();
