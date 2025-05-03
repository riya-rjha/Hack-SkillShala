import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Slide,
} from "@mui/material";
import CodeEditor from "@monaco-editor/react";
import "./CodeEditor.css";
import LanguageSelector from "./LanguageSelector";

const CodeEditorComponent = () => {
  const [showResult, setShowResult] = useState(false);
  const [value, setValue] = useState("");

  const handleRun = () => {
    setShowResult(true);
  };

  const handleSubmit = () => {
    console.log("Submit clicked");
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2e2e5d",
          boxShadow: "none",
          padding: "10px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <img src="/logo.png" className="logo" alt="Logo" />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1rem" }}
            >
              Aarogya Shala
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
              <Box
                component="span"
                sx={{
                  fontStyle: "italic",
                  color: "#00e5ff",
                  fontWeight: "bold",
                }}
              >
                All The Best
              </Box>{" "}
              for your test [Name_of_candidate]
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00cba9",
              color: "#fff",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#00b89c", cursor: "pointer" },
            }}
          >
            Submit Test
          </Button>
        </Toolbar>
      </AppBar>

      <div className="code-editor">
        <LanguageSelector/>
        <div className="ques-code">
          <Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ backgroundColor: "#f5f5f5", padding: 3, overflowY: "auto" }}
            >
              <Paper
                elevation={0}
                sx={{ padding: 2, backgroundColor: "#f5f5f5" }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Two Sum
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  Given an array of integers nums and an integer target, return
                  indices of the two numbers such that they add up to target.
                  You may assume that each input would have exactly one
                  solution, and you may not use the same element twice. You can
                  return the answer in any order.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginTop: 3 }}
                >
                  Input / Output
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Constraints</strong>
                </Typography>
                <ul style={{ marginLeft: "20px", listStyle: "disc" }}>
                  <li>2 &lt;= nums.length &lt;= 10⁴</li>
                  <li>-10⁹ &lt;= nums[i] &lt;= 10⁹</li>
                  <li>-10⁹ &lt;= target &lt;= 10⁹</li>
                </ul>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginTop: 3 }}
                >
                  Examples
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Example 1:</strong>
                  <br />
                  Input: nums = [2,7,11,15], target = 9<br />
                  Output: [0,1]
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className="write-code">
          <CodeEditor
            height="60vh"
            options={{
              lineHeight: 30,
            }}
            language="javascript"
            defaultValue="// Write your code here"
            theme="vs-light"
          />

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            sx={{
              marginTop: "auto",
              padding: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleRun}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Run
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Submit
            </Button>
          </Box>

          <Slide direction="up" in={showResult} mountOnEnter unmountOnExit>
            <Paper
              elevation={4}
              sx={{
                padding: 2,
                marginTop: 3,
                backgroundColor: "#e0f7fa",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Output will be shown here!
            </Paper>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorComponent;
