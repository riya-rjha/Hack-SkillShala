import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-container">

      {/* Hero Section */}
      <div className="services-hero">
        <h1>Our Services</h1>
        <p className="tagline">Empowering your learning journey with structured practice and real-time feedback</p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">

        <div className="service-card">
          <h2>Curated Coding Problems</h2>
          <p>
            SkillShala provides a wide range of carefully selected coding problems categorized by topic and difficulty level.
            This helps learners build strong fundamentals and gradually progress to advanced problem-solving.
          </p>
        </div>

        <div className="service-card">
          <h2>Real-Time Code Execution</h2>
          <p>
            Write and execute code instantly in multiple programming languages. Our system evaluates your logic
            and provides immediate feedback, helping you learn faster and debug efficiently.
          </p>
        </div>

        <div className="service-card">
          <h2>Structured Test Environment</h2>
          <p>
            Experience real exam-like conditions with timed tests, multiple questions, and performance tracking.
            This prepares you for placements, competitive exams, and technical interviews.
          </p>
        </div>

        <div className="service-card">
          <h2>Performance Analytics</h2>
          <p>
            Track your progress with detailed analytics. Identify strengths, weaknesses, and improvement areas
            through test results and performance insights.
          </p>
        </div>

        <div className="service-card">
          <h2>Topic-Wise Learning</h2>
          <p>
            Focus on specific topics like arrays, strings, recursion, and dynamic programming.
            SkillShala ensures targeted practice for mastering each concept step-by-step.
          </p>
        </div>

        <div className="service-card">
          <h2>Code Submission & Storage</h2>
          <p>
            Save and revisit your submitted solutions anytime. Analyze your past attempts and improve
            your approach over time with consistent practice.
          </p>
        </div>

      </div>

      {/* Process Section */}
      <div className="process-section">
        <h2>How SkillShala Works</h2>

        <div className="process-steps">
          <div className="step">
            <span>1</span>
            <p>Select Topic & Level</p>
          </div>

          <div className="step">
            <span>2</span>
            <p>Attempt Structured Test</p>
          </div>

          <div className="step">
            <span>3</span>
            <p>Run & Submit Code</p>
          </div>

          <div className="step">
            <span>4</span>
            <p>Analyze Performance</p>
          </div>

          <div className="step">
            <span>5</span>
            <p>Improve & Repeat</p>
          </div>
        </div>
      </div>

      {/* Highlight Section */}
      <div className="highlight-section">
        <h2>Why Choose Our Services?</h2>
        <ul>
          <li>✔ Real-time evaluation system</li>
          <li>✔ Structured and disciplined learning approach</li>
          <li>✔ Designed for placements and competitive exams</li>
          <li>✔ Beginner to advanced level progression</li>
          <li>✔ Clean and distraction-free environment</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="services-footer">
        SkillShala helps you move from learning concepts to mastering problem-solving.
      </div>

    </div>
  );
};

export default Services;