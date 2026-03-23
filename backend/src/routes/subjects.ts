import express from 'express';
import { pool } from '../config/db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all subjects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [subjects] = await pool.query('SELECT * FROM subjects');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get enrolled subjects with progress mapped safely under a dedicated endpoint BEFORE :id path collision
router.get('/enrolled', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const [enrolledSubjects]: any = await pool.query(`
      SELECT 
        s.id, s.title, s.description, s.thumbnail_url, s.category,
        e.created_at as enrolled_at,
        (SELECT COUNT(v.id) FROM videos v JOIN sections sec ON v.section_id = sec.id WHERE sec.subject_id = s.id) as total_videos,
        (SELECT COUNT(vp.video_id) FROM video_progress vp JOIN videos v ON vp.video_id = v.id JOIN sections sec ON v.section_id = sec.id WHERE sec.subject_id = s.id AND vp.user_id = ? AND vp.is_completed = 1) as completed_videos
      FROM subjects s
      JOIN enrollments e ON e.subject_id = s.id
      WHERE e.user_id = ?
      ORDER BY e.created_at DESC
    `, [userId, userId]);

    res.json(enrolledSubjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/enroll', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const subjectId = req.params.id;
    await pool.query('INSERT IGNORE INTO enrollments (user_id, subject_id) VALUES (?, ?)', [userId, subjectId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get subject details with its full tree (sections -> videos)
router.get('/:id/tree', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const subjectId = req.params.id;
    const userId = req.user!.id;
    
    const [subjects]: any = await pool.query('SELECT * FROM subjects WHERE id = ?', [subjectId]);
    if (subjects.length === 0) return res.status(404).json({ error: 'Subject not found' });
    const subject = subjects[0];

    const [enrollments]: any = await pool.query('SELECT * FROM enrollments WHERE user_id = ? AND subject_id = ?', [userId, subjectId]);
    subject.is_enrolled = enrollments.length > 0;

    const [sections]: any = await pool.query('SELECT * FROM sections WHERE subject_id = ? ORDER BY order_index ASC', [subjectId]);
    
    const [videos]: any = await pool.query(`
      SELECT v.* FROM videos v
      JOIN sections s ON v.section_id = s.id
      WHERE s.subject_id = ?
      ORDER BY s.order_index ASC, v.order_index ASC
    `, [subjectId]);

    const tree = sections.map((sec: any) => ({
      ...sec,
      videos: videos.filter((v: any) => v.section_id === sec.id)
    }));

    res.json({ ...subject, sections: tree });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
