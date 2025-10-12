import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios"; // Make sure you have installed axios: npm install axios

const PersonalizedRoadmap = () => {
  const location = useLocation();
  // Get the 'id', 'code', and 'ques' passed from the previous page's state
  const { id, code, ques } = location.state || {
        "id": 2,
"code": "prev = None\nwhile head.next:\n  temp = head.next\n  head.next = prev\n  prev = head\n  head = temp\nreturn prev",
"ques": "Reverse a Linked List"
  }; // Use default empty object to prevent errors

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      // We need the 'id' to make the API call
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // --- THIS IS THE REAL API CALL ---
        // It sends a POST request to your backend with the submission ID
        const response = await axios.post("http://localhost:3000/analyze", {
          id: id,
        });
        setAnalysis(response.data); // Set the state with the analysis from Gemini
      } catch (err) {
        console.error("Error fetching analysis:", err.message);
        setAnalysis({
          error:
            "An error occurred while fetching your analysis. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]); // The effect runs whenever the 'id' changes

  if (!id || !code || !ques) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-red-700">
            Oops! Missing Data
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            It looks like we didn't receive your code submission.
            <br />
            Please go back and submit your solution to get an analysis.
          </p>
        </div>
      </div>
    );
  }

  return (
    // The rest of your JSX remains exactly the same
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-800 sm:text-5xl">
          Hey there, I'm Abhyaas Gurum!
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
          I've analyzed your code. Let's dive into your personalized report!
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Submission
          </h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-600">Question</h3>
            <p className="mt-2 text-gray-700">{ques}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-600">Your Code</h3>
            <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        </div>

        {loading ? (
          <div className="text-center p-10">
            <p className="text-xl text-indigo-600 animate-pulse">
              🤖 Abhyaas Gurum is analyzing your code...
            </p>
          </div>
        ) : analysis?.error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p className="font-bold">Analysis Failed</p>
            <p>{analysis.error}</p>
          </div>
        ) : (
          analysis && (
            <>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Optimal Solution & Comparison
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
                  <code>{analysis.correctSolution}</code>
                </pre>
                <h3 className="mt-6 text-lg font-semibold text-indigo-600">
                  Comparison
                </h3>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                  {analysis.comparison}
                </p>
              </div>

              {/* Strengths */}
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  Your Strengths ✅
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {analysis.strengths.map((item, idx) => (
                    <li key={idx}>{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                  Areas to Improve 💡
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {analysis.weaknesses.map((item, idx) => (
                    <li key={idx}>{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              </div>

              {/* Roadmap */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  Your Learning Roadmap 🗺️
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {analysis.roadmap.map((item, idx) => (
                    <li key={idx}>{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              </div>

              {/* Alternative Approaches */}
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-4">
                  Alternative Approaches 🧐
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {analysis.alternatives.map((item, idx) => (
                    <li key={idx}>{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default PersonalizedRoadmap;
