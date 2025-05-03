import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(name, email, password);
      const response = await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (e) {
      alert("Service Down");
      console.log(e);
    }
  };
  return (
    <div className="h-screen bg-[#1a133a] text-white flex flex-col font-['Montserrat_Alternates']">
      {/* Navbar */}
      <Navbar />

      {/* Registration Form - flex-grow area */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white text-black w-full max-w-md rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#1a2b44] mb-4" />
            <h2 className="text-2xl font-bold">AarogyaShala</h2>
            <p className="text-center text-gray-500 text-sm mt-1">
              Learn Smarter. Grow Faster. <br /> Powered by AI & Us.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="w-full p-3 bg-[#7fffee] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#00e5d0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="w-full p-3 bg-[#7fffee] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#00e5d0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full p-3 bg-[#7fffee] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#00e5d0]"
              />
            </div>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <span
                className="text-[#00bfb3] font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login!
              </span>
            </p>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full p-3 bg-[#7fffee] text-black font-bold text-lg rounded-md hover:bg-[#5fffe0] transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
