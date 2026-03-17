//     "id": 2,
// "code": "prev = None\nwhile head.next:\n  temp = head.next\n  head.next = prev\n  prev = head\n  head = temp\nreturn prev",
// "ques": "Reverse a Linked List"

import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import AboutUs from "./components/AboutUs.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import Roadmap from "./components/Roadmap.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PersonalizedRoadmap from "./pages/PersonalizedRoadmap.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TestSetup from "./pages/TestSetup.jsx";
import Services from "./components/Services.jsx";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <CssBaseline />
            <Navbar />
            <Box component="main" className="main">
              <MainContent />
            </Box>
            <Footer />
            <Roadmap to='/roadmap'/>
          </Box>
        }
      />
      <Route
        path="/test-setup"
        element={
          <ProtectedRoute>
            <TestSetup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/aboutus"
        element={
          <AboutUs/>
        }
      />
      <Route
        path="/services"
        element={
          <Services/>
        }
      />
      <Route
        path="/test"
        element={
          <ProtectedRoute>
            <CodeEditor />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/analysis"
        element={<PersonalizedRoadmap></PersonalizedRoadmap>}
      />
    </Routes>
  );
};

export default App;
