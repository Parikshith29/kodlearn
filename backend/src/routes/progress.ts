import express from 'express';
import { pool } from '../config/db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Middleware to get user id safely
const requireUser = (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

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

    // Strict sequential lock check: verify if previous video in the subject tree is completed
    // 1. Find the video and its order
    const [videos]: any = await pool.query('SELECT * FROM videos WHERE id = ?', [videoId]);
    if (videos.length === 0) return res.status(404).json({ error: 'Video not found' });
    const currentVideo = videos[0];

    // 2. Find previous video in the same section or previous section
    const [prevVideos]: any = await pool.query(`
      SELECT v.id FROM videos v
      JOIN sections s ON v.section_id = s.id
      WHERE s.subject_id = (SELECT subject_id FROM sections WHERE id = ?)
      AND (
        (s.order_index = (SELECT order_index FROM sections WHERE id = ?) AND v.order_index < ?)
        OR (s.order_index < (SELECT order_index FROM sections WHERE id = ?))
      )
      ORDER BY s.order_index DESC, v.order_index DESC
      LIMIT 1;
    `, [currentVideo.section_id, currentVideo.section_id, currentVideo.order_index, currentVideo.section_id]);

    if (prevVideos.length > 0) {
      // Check if previous video is completed by this user
      const prevVideoId = prevVideos[0].id;
      const [prevProgress]: any = await pool.query('SELECT is_completed FROM video_progress WHERE user_id = ? AND video_id = ?', [userId, prevVideoId]);
      
      const isPrevCompleted = prevProgress.length > 0 && prevProgress[0].is_completed;
      if (!isPrevCompleted) {
        return res.status(403).json({ error: 'Previous lesson must be completed first' });
      }
    }

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
