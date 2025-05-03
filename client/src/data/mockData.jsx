export const mockUserData = {
  id: "user-123",
  name: "Aryan Singh",
  email: "aryan.singh@example.com",
  overallSkillLevel: "Intermediate",
  questionsCompleted: 48,
  jobMatches: 12,
  skills: [
    { name: "Data Structures", level: 78 },
    { name: "Algorithms", level: 72 },
    { name: "System Design", level: 45 },
    { name: "Database Management", level: 65 },
    { name: "Problem Solving", level: 82 },
    { name: "JavaScript", level: 88 },
    { name: "React", level: 75 },
    { name: "Node.js", level: 68 },
  ],
  strengths: [
    "Strong problem-solving skills with JavaScript",
    "Excellent understanding of array manipulations",
    "Good grasp of tree-based algorithms",
    "Proficient in frontend development with React",
  ],
  weaknesses: [
    "Need improvement in complex system design concepts",
    "Graph algorithms require more practice",
    "Dynamic programming concepts need further study",
    "Could improve database optimization techniques",
  ],
  dailyQuestions: [
    {
      title: "Merge K Sorted Lists",
      description:
        "You are given an array of k linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
      topic: "Linked Lists",
      difficulty: "Hard",
      completed: true,
      tags: ["Linked List", "Divide and Conquer", "Heap"],
    },
    {
      title: "Maximum Subarray Sum",
      description:
        "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
      topic: "Arrays",
      difficulty: "Medium",
      completed: false,
      tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    },
  ],
  jobOpportunities: [
    {
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Bangalore, India",
      salary: "₹12L - ₹16L",
      type: "Full-time",
      postedDays: 2,
      matchPercentage: 92,
      description:
        "Looking for a skilled Frontend Developer with experience in React, JavaScript, and modern web technologies.",
      requiredSkills: ["JavaScript", "React", "HTML/CSS", "Problem Solving"],
    },
    {
      title: "Full Stack Engineer",
      company: "InnovateTech",
      location: "Remote",
      salary: "₹15L - ₹22L",
      type: "Full-time",
      postedDays: 5,
      matchPercentage: 85,
      description:
        "Join our team as a Full Stack Engineer to build robust and scalable web applications using modern technologies.",
      requiredSkills: ["JavaScript", "React", "Node.js", "Database Management"],
    },
    {
      title: "Software Engineer",
      company: "CodeWave",
      location: "Hyderabad, India",
      salary: "₹14L - ₹18L",
      type: "Full-time",
      postedDays: 1,
      matchPercentage: 78,
      description:
        "Join our engineering team to build cutting-edge solutions for enterprise customers.",
      requiredSkills: [
        "Data Structures",
        "Algorithms",
        "JavaScript",
        "Problem Solving",
      ],
    },
  ],
  improvementPlan: {
    topics: [
      {
        name: "System Design",
        currentLevel: 45,
        targetLevel: 75,
        priority: 1,
        description:
          "Focus on improving your understanding of distributed systems, load balancing, and scalable architecture.",
        subtopics: [
          "Distributed Systems",
          "Load Balancing",
          "Caching",
          "Microservices",
        ],
      },
      {
        name: "Graph Algorithms",
        currentLevel: 55,
        targetLevel: 80,
        priority: 2,
        description:
          "Practice more graph traversal problems and learn advanced algorithms like Dijkstra and minimum spanning tree.",
        subtopics: [
          "Graph Traversal",
          "Shortest Path",
          "Minimum Spanning Tree",
        ],
      },
      {
        name: "Dynamic Programming",
        currentLevel: 60,
        targetLevel: 85,
        priority: 3,
        description:
          "Strengthen your understanding of DP patterns and practice more complex problems.",
        subtopics: ["Memoization", "Tabulation", "State Transitions"],
      },
    ],
    resources: [
      {
        title: "System Design Interview Guide",
        provider: "TechPrep Academy",
        type: "Course",
        description:
          "A comprehensive course covering all aspects of system design interviews with real-world examples.",
        rating: 4.8,
      },
      {
        title: "Graph Algorithms Masterclass",
        provider: "AlgoExpert",
        type: "Tutorial",
        description:
          "Learn and implement all common graph algorithms with step-by-step explanations.",
        rating: 4.6,
      },
      {
        title: "Dynamic Programming Workshop",
        provider: "CodeCamp",
        type: "Course",
        description:
          "Master dynamic programming through pattern recognition and systematic problem-solving approaches.",
        rating: 4.7,
      },
    ],
  },
  lastAssessment: {
    name: "Data Structures & Algorithms Assessment",
    date: "2 days ago",
    score: 76,
    questionsAttempted: 18,
    totalQuestions: 20,
    timeTaken: 45,
    topicPerformance: [
      { name: "Arrays", score: 90 },
      { name: "Linked Lists", score: 85 },
      { name: "Trees", score: 70 },
      { name: "Graphs", score: 55 },
      { name: "Dynamic Programming", score: 60 },
    ],
  },
};
