import React from "react";
import { useUser } from "../context/UserContext";
import { BookText, Briefcase, User as UserIcon } from "lucide-react";
import SkillsOverview from "./SkillsOverview";
import DailyQuestions from "./DailyQuestions";
import JobOpportunities from "./JobOpportunities";
import ImprovementPlan from "./ImprovementPlan";
import Navbar from "./Navbar";
import RecentAssessmentResults from "./RecentAssessmentResults";

function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Here's your personalized learning journey and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <UserIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Overall Skill Level
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {user.overallSkillLevel}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <BookText size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Questions Completed
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {user.questionsCompleted}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Briefcase size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Job Matches</p>
              <p className="text-2xl font-bold text-gray-900">
                {user.jobMatches}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-8">
            <SkillsOverview />
          </div>
          <div className="lg:col-span-4">
            <RecentAssessmentResults />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-8">
            <ImprovementPlan />
          </div>
          <div className="lg:col-span-4">
            <DailyQuestions />
          </div>
        </div>

        <div className="mb-8">
          <JobOpportunities />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
