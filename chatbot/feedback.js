const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const cors = require("cors");
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.KEY;
if (!apiKey) {
  throw new Error("API Key not found. Please create a .env file with KEY=your_api_key");
}
const genAI = new GoogleGenerativeAI(apiKey);

const submissionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'submissions.json'), 'utf-8'));

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// --- UPDATED API ENDPOINT ---
app.post('/analyze', async (req, res) => {
  try {
    // We now expect an 'id' from the frontend to find the code
    const { id } = req.body;

    const submission = submissionsData.find(sub => sub.id === id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // --- CRITICAL: THE NEW, DETAILED PROMPT ---
    const prompt = `
      You are an expert DSA coding tutor named "Abhyaas Gurum". Analyze the following code submission and provide a detailed, constructive review.
      Your output MUST be a valid JSON object only, with no other text before or after it.

      The JSON object must have these exact keys: "correctSolution", "comparison", "strengths", "weaknesses", "roadmap", "alternatives".

      Problem Title: "${submission.problem_title}"
      User's Code (Python): "${submission.user_code}"

      --- Instructions for each key ---
      1.  "correctSolution": Provide the complete, optimal Python code for the problem.
      2.  "comparison": A short paragraph comparing the user's code to the optimal solution, focusing on the time complexity difference.
      3.  "strengths": A markdown list (using '-') of 2-3 positive points about the user's code (e.g., readability, correct logic for their approach).
      4.  "weaknesses": A markdown list (using '-') of 2-3 key areas for improvement (e.g., inefficiency, missed edge cases, suboptimal data structures).
      5.  "roadmap": A markdown list (using '-') of 3 actionable learning steps the user should take next, including concepts to study and example problems to solve.
      6.  "alternatives": A markdown list (using '-') of 1-2 other valid ways to approach the problem, even if they aren't the most optimal.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let analysisText = response.text();

    // Clean the response to ensure it's a valid JSON string
    const startIndex = analysisText.indexOf('{');
    const endIndex = analysisText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      analysisText = analysisText.substring(startIndex, endIndex + 1);
    }

    const analysisJson = JSON.parse(analysisText);

    res.json(analysisJson);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong during analysis' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});