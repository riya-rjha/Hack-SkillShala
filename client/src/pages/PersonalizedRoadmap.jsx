import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const PersonalizedRoadmap = () => {
  const location = useLocation();
  const { code, ques } = location.state || {};

  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeminiAnalysis = async () => {
      if (!code || !ques) return;

      setLoading(true);
      const prompt = `
You are an expert coding assistant. 
A user has submitted the following coding question and their solution. 

QUESTION:
${ques}

USER'S CODE:
${code}

TASK:
1. First, generate the correct and efficient solution code for the given question.
2. Compare the user’s code with your generated solution.
3. Provide a personalized roadmap for the user to improve — mention key gaps (if any), suggest what concepts to study (e.g., arrays, hash maps, time complexity), and highlight strengths in their approach.
4. Be concise, use bullet points, and clearly structure your response.

Now begin:`;

      try {
        const res = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        setGeminiResponse(data.response); 
      } catch (err) {
        setGeminiResponse("An error occurred while fetching the roadmap.");
      } finally {
        setLoading(false);
      }
    };

    fetchGeminiAnalysis();
  }, [code, ques]);

  if (!code || !ques) {
    return <div>Missing data. Please submit your code and question first.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Personalized Roadmap</h2>

      <div className="mb-6">
        <h3 className="font-semibold">Question:</h3>
        <p className="text-gray-700">{ques}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Your Code:</h3>
        <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
          {code}
        </pre>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Gemini Feedback & Roadmap:</h3>
        {loading ? (
          <p className="text-blue-600">Generating roadmap...</p>
        ) : (
          <pre className="bg-green-50 border border-green-300 p-3 rounded whitespace-pre-wrap">
            {geminiResponse}
          </pre>
        )}
      </div>
    </div>
  );
};

export default PersonalizedRoadmap;
