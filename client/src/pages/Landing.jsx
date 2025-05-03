import React from "react";

export default function GrowthRoadmapPage() {
  return (
    <div className="bg-gradient-to-br from-[#1b163d] to-[#2c2651] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#1a133a] shadow-lg">
        <div className="text-white font-extrabold text-2xl tracking-wide">Aarogya Shala</div>
        <nav className="flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-teal-300 transition-colors">About Us</a>
          <a href="#" className="hover:text-teal-300 transition-colors">Services</a>
          <a href="#" className="hover:text-teal-300 transition-colors">Roadmap</a>
          <a href="#" className="hover:text-teal-300 transition-colors">Free Test</a>
        </nav>
        <button className="bg-teal-400 hover:bg-teal-300 text-black px-5 py-2 rounded-full font-semibold transition-colors">Student Login</button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-16 md:py-24">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            <span className="text-teal-300">Upskilling,</span> an all-in-one platform for students, developers & professionals.
          </h1>
          <p className="text-gray-300 text-lg">
            From interactive courses and coding challenges to career guidance and project-based learning — everything you need is under one roof.
          </p>
          <button className="bg-teal-400 hover:bg-teal-300 text-black px-6 py-3 rounded-full font-bold transition-all shadow-md">Take Assessment</button>
        </div>
        <img
          src="https://via.placeholder.com/300x300"
          alt="Tech Skills Globe"
          className="mt-12 md:mt-0 w-[300px] h-[300px] animate-fade-in"
        />
      </section>

      {/* Roadmap Image Section */}
      <section className="py-20 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold underline decoration-teal-400 mb-10">The Growth Roadmap</h2>
        <img
          src="/mnt/data/3d19e290-449c-4028-a3cc-c1fd1fa5a360.png"
          alt="Growth Roadmap"
          className="max-w-4xl w-full rounded-xl shadow-2xl border border-teal-300"
        />
      </section>

      {/* Motivation Section */}
      <section className="bg-[#0e0c2a] py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Demotivated & Unemployed?</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Feeling stuck or unsure of your next step? We’ve got exactly what you need, tailored to your situation — No fees, no payments, absolutely <span className="text-teal-300 font-bold">FREE</span>! Take a skill-based test today & know where you stand. <br /> <span className="text-teal-300 font-bold">We & Ai are here to assist you!!</span>
        </p>
        <button className="mt-8 bg-teal-400 hover:bg-teal-300 text-black px-6 py-3 rounded-full font-bold shadow-lg transition-all">FREE Skill Assessment</button>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a133a] text-gray-300 pt-14 pb-10 px-6 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Aarogya Shala</h3>
            <p className="text-sm leading-relaxed">Empowering your career journey through personalized learning paths, assessments, and career insights.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Courses</a></li>
              <li><a href="#" className="hover:text-white">Career Support</a></li>
              <li><a href="#" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Connect with Us</h4>
            <p className="text-sm">Stay up to date with new features and updates:</p>
            <div className="mt-4 flex space-x-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-l-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
              <button className="bg-teal-400 hover:bg-teal-300 text-black px-4 py-2 rounded-r-md font-semibold">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-600 pt-4">
          © 2025 Aarogya Shala. All rights reserved.
        </div>
      </footer>
    </div>
  );
}