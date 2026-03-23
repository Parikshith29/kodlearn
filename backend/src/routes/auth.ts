import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userIdStr = 'usr_' + Date.now() + Math.floor(Math.random() * 1000);
    await pool.query(
      'INSERT INTO users (email, password, userId, name, phone) VALUES (?, ?, ?, ?, ?)', 
      [email, hashedPassword, userIdStr, name, '']
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    console.error("Register Error:", error);
    if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });

    await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))', [user.id, refreshToken]);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  const [rows]: any = await pool.query('SELECT * FROM refresh_tokens WHERE token = ?', [refreshToken]);
  if (rows.length === 0) return res.status(403).json({ error: 'Invalid refresh token' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token expired or invalid' });
    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});

router.post('/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    await pool.query('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

export default router;
