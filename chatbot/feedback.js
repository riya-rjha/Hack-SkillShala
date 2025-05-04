const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

// Load environment variables
const apiKey = "AIzaSyBO0aMmK8IZcwLCxaPjsdns7fTZJCn7k3Y";
const genAI = new GoogleGenerativeAI(apiKey);

// Initialize Express app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// API endpoint to handle chat messages
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessageStream(message);

    let responseText = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      responseText += chunkText;
    }

    res.json({ response: responseText }); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});