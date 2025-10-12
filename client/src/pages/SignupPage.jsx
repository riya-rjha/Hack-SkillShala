import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!name || !email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });

      if (response?.data?.token) {
        localStorage.setItem("username", name);
        localStorage.setItem("token", response.data.token);

        alert("Signup successful! Redirecting to home...");
        navigate("/"); 
      } else {
        alert("Signup failed: No token received from server.");
        console.error("No token received:", response.data);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong during signup.";
      alert(`Signup failed: ${message}`);
      console.error("Signup error:", error);
    } finally {
    }
  };


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#1a133a", color: "white", display: "flex", flexDirection: "column", fontFamily: "Poppins" }}>
      {/* Navbar */}
      <Navbar />

      {/* Registration Form */}
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
              Learn Smarter. Grow Faster. <br /> Powered by AI & Us.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>

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
              Already have an account?{" "}
              <Box
                component="span"
                sx={{ color: "#00bfb3", fontWeight: 500, cursor: "pointer", textDecoration: "underline", fontSize: "20px" }}
                onClick={() => navigate("/login")}
              >
                Login!
              </Box>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#7fffee", color: "black", fontWeight: "bold", fontSize: "1rem", "&:hover": { bgcolor: "#5fffe0" } }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
