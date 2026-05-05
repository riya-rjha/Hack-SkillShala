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

const submissionsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'submissions.json'), 'utf-8')
);

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

app.post('/analyze', async (req, res) => {
  try {
    const { id } = req.body;

    const submission = submissionsData.find(sub => sub.id === id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    const prompt = `
      You are an expert DSA coding tutor named "Abhyaas Gurum". Analyze the following code submission and provide a detailed, constructive review.
      Your output MUST be a valid JSON object only, with no other text before or after it.

      The JSON object must have these exact keys: "correctSolution", "comparison", "strengths", "weaknesses", "roadmap", "alternatives".

      Problem Title: "${submission.problem_title}"
      User Code (Python): "${submission.user_code}"

      --- Instructions for each key ---
      1.  "correctSolution": Provide the complete, optimal Python code for the problem.
      2.  "comparison": A short paragraph comparing the users code to the optimal solution, focusing on the time complexity difference.
      3.  "strengths": A markdown list (using -) of 2-3 positive points about the user code (e.g., readability, correct logic for their approach).
      4.  "weaknesses": A markdown list (using -) of 2-3 key areas for improvement (e.g., inefficiency, missed edge cases, suboptimal data structures).
      5.  "roadmap": A markdown list (using -) of 3 actionable learning steps the user should take next.
      6.  "alternatives": A markdown list (using -) of 1-2 other valid ways to approach the problem, even if they arent the most optimal.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let analysisText = response.text();

    const startIndex = analysisText.indexOf('{');
    const endIndex = analysisText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      analysisText = analysisText.substring(startIndex, endIndex + 1);
    }

    try {
      const analysisJson = JSON.parse(analysisText);
      res.json(analysisJson);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      console.error("Raw model output:", analysisText);
      return res.status(500).json({
        error: "Model returned invalid JSON.",
        details: parseError.message,
      });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong during analysis' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});