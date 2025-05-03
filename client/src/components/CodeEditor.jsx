import React, { useState } from "react";
import languageTemplates from "../languageTemplates"; // Import the language templates
import CodeEditor from "@monaco-editor/react";
import "./CodeEditor.css";
import LanguageSelector from "./LanguageSelector";
import { useRef } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
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
import { executeCode } from "./api";
import { testCases } from "../testCases";

const CodeEditorComponent = () => {
  const [showResult, setShowResult] = useState(false);
  const [output, setOutput] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem("code_" + language);
    return saved || languageTemplates[language] || "// Write your code here";
  });
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const arraysEqual = (a, b) =>
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, i) => val === b[i]);

  const parseOutput = (output) => {
    try {
      return JSON.parse(output.trim());
    } catch {
      return output.trim();
    }
  };

  // Wrap user's function call in code
  const wrapUserCode = (code, language, input) => {
    if (language === "javascript") {
      return `
  ${code}
  console.log(JSON.stringify(twoSum(...${input})));
      `;
    }
    // Add wrappers for other languages if needed
    return code;
  };

  const handleRun = async () => {
    const userCode = editorRef.current.getValue();
    if (!userCode) return;

    setIsLoading(true);
    setShowResult(false);

    try {
      const results = [];

      for (let i = 0; i < testCases.length; i++) {
        const { nums, target } = testCases[i].input;
        const input = JSON.stringify([nums, target]);

        const wrappedCode = wrapUserCode(userCode, language, input);

        const { run } = await executeCode(language, wrappedCode);
        const output = parseOutput(run.output); // Clean/parse output
        const passed = arraysEqual(output, testCases[i].expected);

        results.push({ ...testCases[i], actual: output, passed });
      }

      setOutput(
        results
          .map(
            (r, i) =>
              `Test Case ${i + 1}: ${r.passed ? "✅ Passed" : "❌ Failed"}\n` +
              `Input: nums=${JSON.stringify(r.input.nums)}, target=${
                r.input.target
              }\n` +
              `Expected: ${JSON.stringify(r.expected)} | Got: ${JSON.stringify(
                r.actual
              )}\n`
          )
          .join("\n\n")
      );
      setShowResult(true);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
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
          <LanguageSelector
            language={language}
            setLanguage={(newLang) => {
              setLanguage(newLang);
              const saved = localStorage.getItem("code_" + newLang);
              setCode(saved || languageTemplates[newLang]);
            }}
          />
          <CodeEditor
            height="60vh"
            options={{ lineHeight: 30 }}
            language={language}
            value={code}
            onChange={(newCode) => {
              setCode(newCode);
              localStorage.setItem("code_" + language, newCode);
            }}
            onMount={onMount}
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
            <LoadingButton
              variant="contained"
              color="success"
              onClick={handleRun}
              loading={isLoading}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Run
            </LoadingButton>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Submit
            </LoadingButton>
          </Box>

          <Slide direction="up" in={showResult} mountOnEnter unmountOnExit>
            <Paper
              elevation={6}
              sx={{
                padding: 2,
                marginTop: 3,
                backgroundColor: "#e0f7fa",
                fontWeight: "bold",
                textAlign: "center",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {output || "Output will be shown here!"}
            </Paper>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorComponent;
