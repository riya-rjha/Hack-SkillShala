import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Menu, Bell, Settings, ChevronDown } from "lucide-react";

function Navbar() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Skill</span>
              <span className="text-2xl font-bold text-purple-600">Shala</span>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <a
                href="#"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 font-medium"
              >
                Assessments
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 font-medium"
              >
                Jobs
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 font-medium"
              >
                Learning Path
              </a>
            </nav>
          </div>

          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
            </button>
            <button className="ml-2 p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Settings size={20} />
            </button>

            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <span className="ml-2 text-gray-700 hidden md:block">
                    {user.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className="ml-1 text-gray-500 hidden md:block"
                  />
                </button>
              </div>

              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
