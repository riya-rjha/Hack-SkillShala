import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const PersonalizedRoadmap = () => {
  const location = useLocation();
  const { code, ques } = location.state;

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!code || !ques) return;

      setLoading(true);
      // Mock API response for demonstration
      const mockResponse = {
        correctSolution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        comparison:
          "- **User's Code**: Uses nested loops, resulting in O(n²) time complexity.\n- **Correct Solution**: Uses a hash map for O(n) time complexity, significantly more efficient.",
        strengths:
          "- Understands array iteration.\n- Correctly handles edge cases (e.g., no solution).\n- Clear and readable code structure.",
        weaknesses:
          "- Inefficient O(n²) approach due to nested loops.\n- Lacks familiarity with hash maps.\n- No consideration of space complexity.",
        roadmap:
          "- **Study Hash Maps**: Learn how hash maps work and their use in optimizing problems (Resources: LeetCode articles, 'Grokking Algorithms').\n- **Time Complexity**: Understand Big-O notation and how to analyze algorithm efficiency.\n- **Practice Problems**: Solve problems like '3Sum' or 'Group Anagrams' to reinforce hash map usage.",
        alternatives:
          "- **Sorting Approach**: Sort the array and use two pointers (O(n log n)).\n- **Brute Force Optimization**: Check for valid pairs with early termination if possible.",
      };

      try {
        // Simulate API call (replace with actual axios call to your backend)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAnalysis(mockResponse);
      } catch (err) {
        console.error("Error fetching analysis:", err.message);
        setAnalysis({
          error: "An error occurred while fetching the analysis.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [code, ques]);

  if (!code || !ques) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">
          Missing data. Please submit your code and question first.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Friendly Introduction */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-800 sm:text-5xl">
          Hey Abhyaas Gurum, Your Coding Friend Here!
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
          I'm here to analyze your code, celebrate your strengths, and guide you
          to become an even better coder. Let's dive into your personalized
          dashboard!
        </p>
      </div>

      {/* Dashboard Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Question and User's Code */}
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
              {code}
            </pre>
          </div>
        </div>

        {/* Analysis Sections */}
        {loading ? (
          <div className="text-center">
            <p className="text-xl text-indigo-600 animate-pulse">
              Generating your personalized roadmap...
            </p>
          </div>
        ) : analysis?.error ? (
          <div className="text-center">
            <p className="text-xl text-red-600">{analysis.error}</p>
          </div>
        ) : (
          <>
            {/* Correct Solution */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Optimal Solution
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
                {analysis.correctSolution}
              </pre>
              <h3 className="mt-4 text-lg font-semibold text-indigo-600">
                Comparison
              </h3>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                {analysis.comparison}
              </p>
            </div>

            {/* Strengths */}
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Your Strengths
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {analysis.strengths.split("\n").map((item, idx) => (
                  <li key={idx}>{item.replace("- ", "")}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                Areas to Improve
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {analysis.weaknesses.split("\n").map((item, idx) => (
                  <li key={idx}>{item.replace("- ", "")}</li>
                ))}
              </ul>
            </div>

            {/* Roadmap */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Your Learning Roadmap
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {analysis.roadmap.split("\n").map((item, idx) => (
                  <li key={idx}>{item.replace("- ", "")}</li>
                ))}
              </ul>
            </div>

            {/* Alternative Approaches */}
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Alternative Approaches
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {analysis.alternatives.split("\n").map((item, idx) => (
                  <li key={idx}>{item.replace("- ", "")}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalizedRoadmap;
