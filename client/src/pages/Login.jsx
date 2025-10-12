import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/user/login", {
      email,
      password,
    });

    const { token, user, message } = response.data;

    localStorage.setItem("username", user.name);
    localStorage.setItem("token", token);

    alert(message || "Login successful!");
    navigate("/");

  } catch (error) {
    console.error("Login error:", error);

    if (error.response) {
      const { status, message } = error.response.data;

      switch (error.response.status) {
        case 400:
          alert(message || "All fields are required.");
          break;
        case 401:
          alert(message || "Invalid credentials.");
          break;
        case 404:
          alert(message || "Email not found.");
          break;
        default:
          alert(message || "Something went wrong. Please try again.");
      }
    } else if (error.request) {
      alert("No response from server. Please check your connection.");
    } else {
      alert("An unexpected error occurred.");
    }
  }
};


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#1A1440", color: "white", display: "flex", flexDirection: "column", fontFamily: "Montserrat Alternates" }}>
      {/* Navbar */}
      <Navbar />

      {/* Login Form */}
      <Container sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
        <Paper sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 3, textAlign: "center", bgcolor: "white" }} elevation={6}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{ bgcolor: "#1a2b44", width: 80, height: 80, mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              SkillShala
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Learn Smarter. Grow Faster. Powered by AI & Us.
            </Typography>
          </Box>

          <form onSubmit={handleLogin}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>

            <Typography variant="body2" sx={{ mb: 2 }}>
              Don’t have an account?{" "}
              <Box
                component="span"
                sx={{ color: "#00bfb3", fontWeight: 500, cursor: "pointer", textDecoration: "underline", fontSize: "20px" }}
                onClick={() => navigate("/signup")}
              >
                Register!
              </Box>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#7fffee", color: "black", fontWeight: "bold", fontSize: "1rem", "&:hover": { bgcolor: "#5fffe0" } }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
