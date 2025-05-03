import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ExternalLink, Calendar, Building, MapPin, DollarSign, Briefcase, Star, Filter } from 'lucide-react';

const JobOpportunities = () => {
  const { user } = useUser();
  const [filter, setFilter] = useState('all');

  const filteredJobs = filter === 'all' 
    ? user.jobOpportunities 
    : user.jobOpportunities.filter(job => job.matchPercentage >= 90);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Job Opportunities</h2>
            <p className="text-sm text-gray-600">Matched based on your skills and performance</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                filter === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setFilter('best')}
              className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                filter === 'best' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Best Matches
            </button>
            <button
              className="p-1.5 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300"
            >
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                    {job.company.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 text-sm">{job.title}</h3>
                    <p className="text-xs text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div 
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      job.matchPercentage >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : job.matchPercentage >= 75 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {job.matchPercentage}% Match
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1.5" />
                  {job.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign size={14} className="mr-1.5" />
                  {job.salary}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase size={14} className="mr-1.5" />
                  {job.type}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-1.5" />
                  Posted {job.postedDays} days ago
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {job.requiredSkills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                        ${user.skills.some(s => s.name === skill && s.level >= 70)
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {user.skills.some(s => s.name === skill && s.level >= 70) && (
                        <Star size={10} className="mr-1" />
                      )}
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Details
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No job opportunities match your current filter.</p>
            <button 
              onClick={() => setFilter('all')}
              className="mt-2 text-blue-600 font-medium hover:text-blue-800"
            >
              View all opportunities
            </button>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            View All Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOpportunities;
