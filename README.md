# 🚀 Hack-SkillShala: The AI-Powered DSA Learning Platform

Hack-SkillShala is a comprehensive, AI-driven web application designed to provide a personalized learning roadmap for students mastering Data Structures and Algorithms (DSA). Moving beyond generic practice sheets, this platform acts as a personal AI tutor that analyzes a user's coding skills, identifies their specific strengths and weaknesses, and generates a dynamic study plan and tailored career recommendations to accelerate their journey into the software industry.

## ✨ Key Features

  * **Personalized Dashboards:** Secure user authentication leads to a central hub where students can track their progress, view test scores, and access their custom learning plan.
  * **AI Code Analysis:** Utilizes an integrated Monaco Code Editor and Judge0 for secure code execution. A fine-tuned AI model provides deep analysis of submissions, covering time complexity, code style, and optimal alternative solutions.
  * **Dynamic Learning Roadmaps:** After each assessment, the system generates a personalized 14-day study plan using content-based filtering to recommend questions that target the user's specific weak areas.
  * **Smart Job Recommendations:** An intelligent engine scrapes and analyzes job descriptions, using vector similarity search to match a user's demonstrated skills with relevant career opportunities.
  * **ATS-Optimized Resume Builder:** An integrated tool that helps users create a professional, ATS-friendly resume populated with their validated skills from the platform.
  * **Interactive Chatbot:** A helpful chatbot to answer user queries and provide guidance.

-----

## 🛠️ Tech Stack

The project is a full-stack application built with a modern technology stack:

  * **Frontend:** React.js (in the `client` directory)
  * **Backend:** Node.js, Express.js (in the `server` directory)
  * **Database:** MongoDB & PostGRE SQL
  * **AI / Machine Learning (in `ai-demo`):**
      * Python
      * Pandas & Scikit-learn for Content-Based Filtering
      * Google Vertex AI (Gemini Pro, Text Embedding Models) for fine-tuning and semantic search.
  * **Code Execution:** Judge0 API
  * **Code Editor:** Monaco Editor

-----

## 📂 Folder Structure

The repository is organized into several key directories:

```
├── ai-demo/         # Contains Python scripts for AI model training & simulation
├── chatbot/         # Houses the logic for the interactive chatbot
├── client/          # The React frontend application
├── server/          # The Node.js/Express backend API
├── .gitignore
├── package.json     # Lists dependencies for the server
└── README.md
```

-----

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### **Prerequisites**

Make sure you have the following installed on your machine:

  * [Node.js](https://nodejs.org/en/) (which includes npm)
  * [Python](https://www.python.org/downloads/)
  * [MongoDB](https://www.mongodb.com/try/download/community)

### **Installation**

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/riya-rjha/Hack-SkillShala.git
    cd Hack-SkillShala
    ```

2.  **Install Backend Dependencies:**
    Navigate to the server directory and install the required npm packages.

    ```sh
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    In a new terminal, navigate to the client directory and install its packages.

    ```sh
    cd client
    npm install
    ```

4.  **Set Up Environment Variables:**
    Create a `.env` file in the `server` directory and add your configuration variables, such as your MongoDB connection string and any API keys.

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

-----

## 🏃‍♂️ Usage

1.  **Start the Backend Server:**
    From the `server` directory, run:

    ```sh
    npm run dev
    ```

    The server will start, typically on `http://localhost:8000`.

2.  **Start the Frontend Application:**
    From the `client` directory, run:

    ```sh
    npm start
    ```

    The React development server will start, and your application will open in your browser, usually at `http://localhost:3000`.

You can now register a new user and start exploring the platform's features\!