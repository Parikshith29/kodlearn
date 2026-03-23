import express from 'express';
import { pool } from '../config/db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Middleware to get user id safely
const requireUser = (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

router.get('/stats', authenticateToken, requireUser, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const [lessonsResult]: any = await pool.query(
      'SELECT COUNT(*) as completed FROM video_progress WHERE user_id = ? AND is_completed = 1',
      [userId]
    );
    const [hoursResult]: any = await pool.query(
      'SELECT COALESCE(SUM(last_watched_time), 0) as totalSeconds FROM video_progress WHERE user_id = ?',
      [userId]
    );
    const lessonsCompleted = lessonsResult[0].completed || 0;
    
    // Convert generic seconds out of pure watch tracking metric (summing multiple videos can yield seconds)
    // To make it look realistic for demo (hours watched to all videos), scale appropriately from real usage
    const hoursWatched = Math.round((hoursResult[0].totalSeconds || 0) / 3600 * 10) / 10;
    
    return res.json({ lessonsCompleted, hoursWatched });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/videos/:id', authenticateToken, requireUser, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const videoId = req.params.id;
    
    const [progress]: any = await pool.query('SELECT * FROM video_progress WHERE user_id = ? AND video_id = ?', [userId, videoId]);
    if (progress.length === 0) {
      return res.json({ is_completed: false, last_watched_time: 0 });
    }
    
    res.json(progress[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/videos/:id', authenticateToken, requireUser, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const videoId = Number(req.params.id);
    const { last_watched_time, is_completed } = req.body;



    // Upsert progress
    await pool.query(`
      INSERT INTO video_progress (user_id, video_id, last_watched_time, is_completed)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      last_watched_time = GREATEST(VALUES(last_watched_time), last_watched_time),
      is_completed = IF(VALUES(is_completed) = 1, 1, is_completed)
    `, [userId, videoId, last_watched_time || 0, is_completed || false]);

    res.json({ message: 'Progress updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
