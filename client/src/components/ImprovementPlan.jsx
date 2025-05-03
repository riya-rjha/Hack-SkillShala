import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Star,
} from "lucide-react";

const ImprovementPlan = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("topics");

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Improvement Plan
            </h2>
            <p className="text-sm text-gray-600">
              Personalized recommendations based on your performance
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("topics")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === "topics"
                  ? "bg-white text-blue-700 shadow"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Topics
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === "timeline"
                  ? "bg-white text-blue-700 shadow"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === "resources"
                  ? "bg-white text-blue-700 shadow"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Resources
            </button>
          </div>
        </div>

        {activeTab === "topics" && (
          <div className="space-y-6">
            {user.improvementPlan.topics.map((topic, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-blue-100 p-2 mr-3">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {topic.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Current proficiency: {topic.currentLevel}%
                        </p>
                      </div>
                      <div className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                        Priority {topic.priority}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                        <span>Current</span>
                        <span>Target</span>
                      </div>
                      <div className="relative w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="absolute left-0 h-2 bg-blue-500 rounded-full"
                          style={{ width: `${topic.currentLevel}%` }}
                        />
                        <div
                          className="absolute h-4 w-1 bg-green-500 rounded-full top-1/2 transform -translate-y-1/2"
                          style={{ left: `${topic.targetLevel}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      {topic.description}
                    </p>

                    <div className="flex space-x-2 mb-3">
                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                        <span
                          key={subtopicIndex}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {subtopic}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Learning Path
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft size={20} className="text-gray-500" />
              </button>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span className="font-medium text-gray-700">June 2025</span>
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <div className="grid grid-cols-7 gap-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day, index) => (
                      <div
                        key={index}
                        className="text-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="p-2">
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 ${
                        day === 15
                          ? "bg-blue-100 border border-blue-300"
                          : day % 7 === 0
                          ? "bg-gray-50"
                          : ""
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {day}
                      </span>
                      {day % 3 === 0 && (
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1"></div>
                      )}
                      {day % 5 === 0 && (
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 justify-center mt-4">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Practice</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Assessment</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">
                Recommended Resources
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  All
                </button>
                <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-md">
                  Tutorials
                </button>
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Courses
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.improvementPlan.resources.map((resource, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {resource.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        resource.type === "Tutorial"
                          ? "bg-blue-100 text-blue-700"
                          : resource.type === "Course"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {resource.provider}
                  </p>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={
                              i < resource.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">
                        {resource.rating.toFixed(1)}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Access
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovementPlan;
