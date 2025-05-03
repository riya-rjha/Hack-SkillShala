/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from "react";
import { useUser } from "../context/UserContext";
import { TrendingUp, Clock, BarChart } from "lucide-react";

const RecentAssessmentResults = () => {
  const { user } = useUser();
  const score = user.lastAssessment.score;

  const getScoreClass = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const getBarColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    return "bg-yellow-500";
  };

  const getTopicBarColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden h-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Assessment</h2>
          <span className="text-sm text-gray-500">
            <Clock size={14} className="inline mr-1" />
            {user.lastAssessment.date}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">
              {user.lastAssessment.name}
            </h3>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getScoreClass(
                  score
                )}`}
              >
                Score: {score}%
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ease-in-out ${getBarColor(
                  score
                )}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <BarChart size={16} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Questions Attempted
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.lastAssessment.questionsAttempted}/
                    {user.lastAssessment.totalQuestions}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-2 mr-3">
                <TrendingUp size={16} className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Time Taken
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.lastAssessment.timeTaken} min
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Performance by Topic
            </h4>
            {user.lastAssessment.topicPerformance.map((topic, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-700">{topic.name}</span>
                  <span className="text-xs font-medium text-gray-900">
                    {topic.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${getTopicBarColor(
                      topic.score
                    )}`}
                    style={{ width: `${topic.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentAssessmentResults;
