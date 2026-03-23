import express from 'express';
import { pool } from '../config/db';
import { authenticateToken } from '../middleware/auth';

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

// Get subject details with its full tree (sections -> videos)
router.get('/:id/tree', authenticateToken, async (req, res) => {
  try {
    const subjectId = req.params.id;
    const [subjects]: any = await pool.query('SELECT * FROM subjects WHERE id = ?', [subjectId]);
    
    if (subjects.length === 0) return res.status(404).json({ error: 'Subject not found' });
    const subject = subjects[0];

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
