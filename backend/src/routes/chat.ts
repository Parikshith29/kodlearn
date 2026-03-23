import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const hf = new HfInference(process.env.HF_TOKEN);

router.post('/ai', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are KodBot, an expert AI programming assistant seamlessly integrated into the KodLearn LMS platform. 
Current Context: ${context || 'General Dashboard'}
Guidelines:
1. Provide extremely concise, highly accurate answers.
2. If the user asks about coding, provide working code snippets and explain them briefly.
3. Be friendly, encouraging, and write in a professional, developer-focused tone.
4. Do not hallucinates features or make up URLs.`;

    const out = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-7B-Instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
    });

    res.json({ reply: out.choices[0]?.message?.content || 'No response generated.' });
  } catch (error: any) {
    if (error.message && error.message.includes('currently loading')) {
      return res.json({ reply: `*KodBot engine is warming up.* Please wait a few seconds and try again.` });
    }
    console.error("HF SDK Inference Error:", error);
    res.status(500).json({ error: 'AI Service currently degraded or overloaded.' });
  }
});

export default router;
