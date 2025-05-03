import React from 'react';
import { useUser } from '../context/UserContext';
import { ExternalLink, CheckCircle, ArrowRightCircle } from 'lucide-react';

function DailyQuestions() {
  const { user } = useUser();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden h-full">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Daily Practice</h2>
          <p className="text-sm text-gray-600">{today}</p>
        </div>
        
        <div className="space-y-4">
          {user.dailyQuestions.map((question, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 transition-all hover:shadow-md hover:border-blue-300"
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 rounded-full ${question.completed ? 'bg-green-100' : 'bg-blue-100'} p-2 mr-3`}>
                  {question.completed ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <ArrowRightCircle size={20} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{question.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{question.topic} • {question.difficulty}</p>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.description}</p>
                  <div className="flex space-x-2">
                    {question.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <a 
                  href="#" 
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  {question.completed ? 'Review Solution' : 'Start Now'}
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {user.dailyQuestions.every(q => q.completed) && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Well done! You've completed today's questions.</p>
            <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              View more practice questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyQuestions;