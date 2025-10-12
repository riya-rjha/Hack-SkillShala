import React, { useState, useRef, useEffect } from "react";
import CodeEditor from "@monaco-editor/react";
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
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useLocation } from "react-router-dom";
import { executeCode } from "./api";
import LanguageSelector from "./LanguageSelector";
import problems from "../data.json";
import languageTemplates from "../languageTemplates";
import "./CodeEditor.css";
import axios from "axios";

const CodeEditorComponent = () => {
  const [showResult, setShowResult] = useState(false);
  const [output, setOutput] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const editorRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const { topic, level, selectedQuestions } = location.state || {};
  const username = localStorage.getItem("username") || "Candidate";

  // Current selected question
  const selectedProblem =
    selectedQuestions && selectedQuestions.length > 0
      ? selectedQuestions[currentQIndex]
      : problems[0];

  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem(`code_${language}_${currentQIndex}`);
    return (
      saved ||
      selectedProblem.functionSignature[language] ||
      "// Write your code here"
    );
  });

  // Update code when currentQIndex or language changes
  useEffect(() => {
    const saved = localStorage.getItem(`code_${language}_${currentQIndex}`);
    setCode(
      saved ||
        (selectedProblem.functionSignature
          ? selectedProblem.functionSignature[language]
          : languageTemplates[language]) ||
        "// Write your code here"
    );
  }, [currentQIndex, language, selectedProblem]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleRun = async () => {
    const userCode = editorRef.current.getValue();
    if (!userCode) {
      setOutput("Error: No code provided.");
      setShowResult(true);
      return;
    }

    setIsLoading(true);
    setShowResult(false);

    try {
      const results = [];
      const testCases = selectedProblem.testCases;

      const wrapped = wrapUserCode(userCode, language, testCases);
      let sourceCode = wrapped;
      let stdin = "";

      if (language === "java") {
        sourceCode = wrapped.sourceCode;
        stdin = wrapped.stdin;
      }

      const { run } = await executeCode(language, sourceCode, stdin);
      const outputs = parseOutput(run.output);

      testCases.forEach((testCase, i) => {
        const actual = Array.isArray(outputs) ? outputs[i] : outputs;
        let parsedActual;
        try {
          parsedActual =
            typeof actual === "string" ? JSON.parse(actual) : actual;
        } catch {
          parsedActual = actual;
        }
        const passed = arraysEqual(parsedActual, testCase.expected);
        results.push({ ...testCase, actual: parsedActual, passed });
      });

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

  const clearTestData = () => {
    localStorage.removeItem("selectedTopic");
    localStorage.removeItem("selectedLevel");

    Object.keys(languageTemplates).forEach((lang) => {
      selectedQuestions?.forEach((_, idx) => {
        localStorage.removeItem(`code_${lang}_${idx}`);
      });
    });

    setCode("");
    setLanguage("javascript");
    setShowResult(false);
    setOutput(null);
  };

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit the test?")) {
      clearTestData();
      navigate("/");
    }
  };

  const handleSubmitTest = async () => {
    if (!window.confirm("Are you sure you want to submit the test?")) return;

  // Gather submitted codes
  const submittedData = selectedQuestions.map((q) => {
    const savedCode = localStorage.getItem(`submitted_code_${q.id}`) || "";
    return {
      questionId: q.id,
      title: q.title,
      userSolution: savedCode,
    };
  });

  console.log(submittedData);
  try {
    const response = await axios.post("http://localhost:8080/test/save-submission", submittedData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("✅ Test submitted successfully!");
      clearTestData();
      navigate("/roadmap", {
        state: { code, ques: selectedProblem.description },
      });
    } else {
      alert("⚠️ Something went wrong while submitting the test.");
    }
  } catch (error) {
    console.error("❌ Submission error:", error);
    alert("Failed to submit test. Please try again later.");
  }
    // if (window.confirm("Are you sure you want to submit the test?")) {
    //   navigate("/roadmap", {
    //     state: { code, ques: selectedProblem.description },
    //   });
    //   clearTestData();
    // }
  };

  const handleSubmitCode = () => {
  if (!selectedProblem) return;

  const submittedCodeKey = `submitted_code_${selectedProblem.id}`;
  localStorage.setItem(submittedCodeKey, code);

  alert(`Code submitted for problem ID: ${selectedProblem.id}`);
};

  return (
    <div>
      {/* Top AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2e2e5d",
          boxShadow: "none",
          padding: "10px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Name */}
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                border: "2px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                mr: 1,
              }}
            >
              <img src="/logo.png" alt="Logo" style={{ width: "90%" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1rem", color: "#fff" }}
            >
              SkillShala
            </Typography>
          </Box>

          {/* Topic, Level, Username */}
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: "0.95rem", fontWeight: 500, opacity: 0.9, mb: 0.5 }}
            >
              Topic: {topic || "N/A"} | Level: {level || "N/A"}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
              All the best for your test, {username.toUpperCase()}!
            </Typography>
          </Box>

          {/* Exit & Submit */}
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              }}
              onClick={handleExit}
            >
              Exit Test
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00cba9",
                color: "#fff",
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#00b89c" },
              }}
              onClick={handleSubmitTest}
            >
              Submit Test
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Editor Area */}
      <div className="code-editor">
        {/* Question Panel */}
        <div className="ques-code">
          <Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ backgroundColor: "#f5f5f5", padding: 3, overflowY: "auto" }}
            >
              {/* Question Tabs */}
              <Box display="flex" gap={2} pb={2} sx={{borderBottom: "1px solid grey"}}>
                {selectedQuestions?.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    sx={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      backgroundColor: idx === currentQIndex ? "#00cba9" : "#ccc",
                      color: idx === currentQIndex ? "#fff" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {idx + 1}
                  </Box>
                ))}
              </Box>

              {/* Question Details */}
              <Paper elevation={0} sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  {selectedProblem.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedProblem.description}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                  Examples
                </Typography>
                {selectedProblem.testCases.map((tc, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mt: 1 }}>
                    <strong>Example {idx + 1}:</strong>
                    <br />
                    Input: {JSON.stringify(tc.input)}
                    <br />
                    Output: {JSON.stringify(tc.expected)}
                  </Typography>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </div>

        {/* Code Editor Panel */}
        <div className="write-code">
          <LanguageSelector
            language={language}
            setLanguage={(newLang) => setLanguage(newLang)}
          />

          <CodeEditor
            height="60vh"
            options={{ lineHeight: 30 }}
            language={language}
            value={code}
            onChange={(newCode) => {
              setCode(newCode);
              localStorage.setItem(`code_${language}_${currentQIndex}`, newCode);
            }}
            onMount={onMount}
            theme="vs-light"
          />

          {/* Run / Submit Buttons */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            sx={{ marginTop: "auto", padding: 2, backgroundColor: "#f5f5f5" }}
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
              onClick={handleSubmitCode}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Submit
            </LoadingButton>
          </Box>

          {/* Output Slide */}
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
