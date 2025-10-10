import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/analyze', async (req, res) => {
  try {
    const { problem, userCode } = req.body;

    if (!userCode) {
      return res.status(400).json({ error: "userCode is required" });
    }

    const prompt = `
      You are an expert AI coding assistant. Analyze this user's code submission and provide a detailed analysis including:
      1. A code quality rating (1-5).
      2. A list of any logic or syntax errors.
      3. Specific suggestions for improvement.
      4. The time and space complexity.
      5. An alternative, more optimal approach.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    res.json({ analysis });

  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to analyze code with Gemini API" });
  }
});

export default router;