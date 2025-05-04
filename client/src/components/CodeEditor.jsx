import React, { useState, useEffect, useRef } from "react";
import CodeEditor from "@monaco-editor/react";
import "./CodeEditor.css";
import LanguageSelector from "./LanguageSelector";
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
import { useNavigate } from "react-router-dom";
import problems from "../data.json"; // Import the problems JSON file
import languageTemplates from "../languageTemplates";

const CodeEditorComponent = () => {
  const [showResult, setShowResult] = useState(false);
  const [output, setOutput] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem("code_" + language);
    return (
      saved ||
      problems[0].functionSignature[language] ||
      "// Write your code here"
    );
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const editorRef = useRef();
  const navigate = useNavigate();
  const [ques, setQues] = useState(selectedProblem.description);

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

  // Validate user's Java code
  const isValidJavaCode = (code) => {
    return code.includes("public int[] twoSum(int[] nums, int target)");
  };

  // Generate test harness to run the user's function against test cases
  const wrapUserCode = (code, language, testCases) => {
    if (language === "javascript") {
      let harness = `
${code}
const results = [];
`;

      testCases.forEach((testCase) => {
        const { nums, target } = testCase.input;
        harness += `
try {
  const result = twoSum(${JSON.stringify(nums)}, ${target});
  results.push(JSON.stringify(result));
} catch (e) {
  results.push("Error: " + e.message);
}
`;
      });

      harness += `
console.log(JSON.stringify(results));
`;
      return harness;
    } else if (language === "java") {
      // Prepare input string for Scanner (simulate System.in)
      let inputString = "";
      testCases.forEach((testCase) => {
        const { nums, target } = testCase.input;
        inputString += `${nums.length}\n${nums.join(" ")}\n${target}\n`;
      });

      // Test harness for Java
      const harness = `
import java.util.*;
${code}
public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    List<String> results = new ArrayList<>();
    
    // Process all test cases
    try {
      for (int t = 0; t < ${testCases.length}; t++) {
        int n = scanner.nextInt(); // Read array length
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
          nums[i] = scanner.nextInt(); // Read array elements
        }
        int target = scanner.nextInt(); // Read target
        Solution sol = new Solution();
        int[] result = sol.twoSum(nums, target);
        results.add("[" + result[0] + "," + result[1] + "]");
      }
    } catch (Exception e) {
      results.add("Error: " + e.getMessage());
    }
    
    // Output results as JSON array
    System.out.println(results.toString().replace(" ", ""));
  }
}
`;
      return { sourceCode: harness, stdin: inputString };
    }
    return code;
  };

  const handleRun = async () => {
    const userCode = editorRef.current.getValue();
    if (!userCode) {
      setOutput("Error: No code provided.");
      setShowResult(true);
      return;
    }

    // Validate Java code
    if (language === "java" && !isValidJavaCode(userCode)) {
      setOutput(
        "Error: Please provide a valid Solution class with a twoSum method."
      );
      setShowResult(true);
      return;
    }

    setIsLoading(true);
    setShowResult(false);

    try {
      const results = [];
      const testCases = selectedProblem.testCases;

      // Wrap the user's code
      const wrapped = wrapUserCode(userCode, language, testCases);
      let sourceCode = wrapped;
      let stdin = "";

      if (language === "java") {
        sourceCode = wrapped.sourceCode;
        stdin = wrapped.stdin;
      }

      // Execute the wrapped code
      const { run } = await executeCode(language, sourceCode, stdin);
      const outputs = parseOutput(run.output);

      // Compare each test case result
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

      // Format the output
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
    navigate("/roadmap", {
      state: { code, ques: selectedProblem.description },
    });
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
              SkillShala
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
                  {selectedProblem.title}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {selectedProblem.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 2, fontStyle: "italic" }}
                >
                  <strong>Note</strong>: Write only the Solution class with the twoSum method. Do
                  not include main or Scanner code in all languages except for Java. In Java, add a main class of public static void main, rest use normal functions.
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
                  <li>
                    2 &lt;= nums.length &lt;= 10<sup>4</sup>
                  </li>
                  <li>
                    -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
                  </li>
                  <li>
                    -10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup>
                  </li>
                </ul>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginTop: 3 }}
                >
                  Examples
                </Typography>
                {selectedProblem.testCases.map((testCase, index) => (
                  <Typography key={index} variant="body2" sx={{ marginTop: 1 }}>
                    <strong>Example {index + 1}:</strong>
                    <br />
                    Input: nums = {JSON.stringify(testCase.input.nums)}, target
                    = {testCase.input.target}
                    <br />
                    Output: {JSON.stringify(testCase.expected)}
                  </Typography>
                ))}
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
              setCode(
                saved ||
                  selectedProblem.functionSignature[newLang] ||
                  languageTemplates[newLang]
              );
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
