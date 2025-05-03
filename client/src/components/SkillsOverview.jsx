import React from "react";
import { useUser } from "../context/UserContext";
import { ChevronRight } from "lucide-react";

function SkillsOverview() {
  const { user } = useUser();

  // Function to determine color based on skill level
  const getSkillColor = (level) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    if (level >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Function to determine text color based on skill level
  const getTextColor = (level) => {
    if (level >= 80) return "text-green-700";
    if (level >= 60) return "text-blue-700";
    if (level >= 40) return "text-yellow-700";
    return "text-red-700";
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Skills Analysis</h2>
          <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Skill Proficiency</h3>
            {user.skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                  </span>
                  <span
                    className={`text-sm font-semibold ${getTextColor(
                      skill.level
                    )}`}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${getSkillColor(
                      skill.level
                    )} h-2 rounded-full transition-all duration-500 ease-in-out`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-4">
              Strengths & Weaknesses
            </h3>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-green-700 mb-2">
                Strong Areas
              </h4>
              <ul className="space-y-2">
                {user.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-green-800">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-red-700 mb-2">
                Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {user.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-red-800">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsOverview;
