import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (e) {
      alert("Service Down");
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1440] flex flex-col font-['Montserrat_Alternates']">
      {/* Navbar */}
      <Navbar />

      {/* Login Card */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="w-24 h-24 mx-auto bg-[#1A2B4C] rounded-full mb-4"></div>
          <h2 className="text-2xl font-bold mb-1">AarogyaShala</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Learn Smarter. Grow Faster. Powered by AI & Us.
          </p>

          <form className="space-y-4 text-left" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-[#7fffee] text-black placeholder-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-[#7fffee] text-black placeholder-gray-700 focus:outline-none"
              />
            </div>
            <p className="text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-teal-500 font-semibold cursor-pointer hover:underline"
              >
                Register!
              </span>
            </p>
            <button
              type="submit"
              className="w-full bg-[#7fffee] text-black font-bold py-3 rounded-md hover:bg-teal-200 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
