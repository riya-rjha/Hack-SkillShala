import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import Roadmap from "./components/Roadmap.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/SignupPage.jsx";

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
            <Roadmap />
          </Box>
        }
      />
      <Route path="/test" element={<CodeEditor />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default App;
