import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <div className="about-hero">
        <h1>SkillShala</h1>
        <p className="tagline">Learn. Practice. Excel.</p>
        <p className="description">
          An intelligent platform to master problem-solving through structured practice and real-time feedback.
        </p>
      </div>

      {/* Who We Are */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          SkillShala is built to bridge the gap between learning concepts and applying them in real-world scenarios.
          Our platform focuses on making coding practice structured, interactive, and effective.
        </p>
      </section>

      {/* What We Do */}
      <section className="about-section">
        <h2>What We Do</h2>
        <div className="card-grid">
          <div className="card">Curated coding problems</div>
          <div className="card">Real-time code execution</div>
          <div className="card">Structured test environments</div>
          <div className="card">Performance tracking</div>
          <div className="card">Feedback-based improvement</div>
          <div className="card">Topic-wise learning paths</div>
        </div>
      </section>

      {/* Vision */}
      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          To become a one-stop platform where students can learn, practice,
          analyze performance, and confidently crack placements and competitive exams.
        </p>
      </section>

      {/* Approach */}
      <section className="about-section">
        <h2>Our Approach</h2>
        <ul>
          <li>Practice-driven learning</li>
          <li>Consistency over cramming</li>
          <li>Real-world problem solving</li>
          <li>Continuous feedback & improvement</li>
        </ul>
      </section>

      {/* Why SkillShala */}
      <section className="about-section">
        <h2>Why SkillShala?</h2>
        <div className="card-grid">
          <div className="card">Clean & distraction-free UI</div>
          <div className="card">Structured tests</div>
          <div className="card">Performance analytics</div>
          <div className="card">Beginner to advanced path</div>
          <div className="card">Focused learning</div>
          <div className="card">Real-time evaluation</div>
        </div>
      </section>

      {/* Footer */}
      <div className="about-footer">
        SkillShala is not just a platform — it’s a disciplined pathway to mastering problem-solving.
      </div>

    </div>
  );
};

export default About;