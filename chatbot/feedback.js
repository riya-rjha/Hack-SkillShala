const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const cors = require("cors");
const fs = require('fs'); // Import the File System module
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Load environment variables
const apiKey = process.env.KEY;
if (!apiKey) {
  throw new Error("API Key not found. Please create a .env file with KEY=your_api_key");
}
const genAI = new GoogleGenerativeAI(apiKey);

// Load your submissions data
const submissionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'submissions.json'), 'utf-8'));

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini model (Using a current, valid model name)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash'});

// API endpoint for code analysis
app.post('/analyze', async (req, res) => {
  try {
    const { id } = req.body; // Expect an ID from the request body

    // Find the submission in our data
    const submission = submissionsData.find(sub => sub.id === id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // --- PROMPT ENGINEERING: Create a detailed prompt for the AI ---
    const prompt = `
      You are an expert DSA code reviewer. Provide a detailed, constructive review for the following code submission.
      Your output MUST be a valid JSON object only, with no other text before or after it.
      The JSON object should have these exact keys: "complexity", "style", "alternative".

      Problem Title: "${submission.problem_title}"
      User's Code (Python): "${submission.user_code}"

      Analyze the code and provide your feedback in the specified JSON format.
      - For "complexity": Analyze the Big O time and space complexity. State if it's optimal.
      - For "style": Comment on readability, potential logic errors, or style conventions.
      - For "alternative": Briefly describe a more optimal or different approach to solve the problem.
    `;
    
    // Use the model to get the analysis
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let analysisText = response.text();

    // --- THIS IS THE FIX ---
    // The model sometimes wraps its response in markdown (```json ... ```).
    // This code cleans that wrapper to get the pure JSON string.
    const startIndex = analysisText.indexOf('{');
    const endIndex = analysisText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      analysisText = analysisText.substring(startIndex, endIndex + 1);
    }
    // ----------------------
    
    // Now, parse the cleaned JSON string.
    const analysisJson = JSON.parse(analysisText);
    
    res.json(analysisJson); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong during analysis' });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});