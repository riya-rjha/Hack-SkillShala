/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
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
  ButtonBase,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useLocation } from "react-router-dom";
import { executeCode } from "./api";
import LanguageSelector from "./LanguageSelector";
import problems from "../data.json";
import languageTemplates from "../languageTemplates";
import "./CodeEditor.css";
import axios from "axios";

// Extract function name from code
const extractFunctionName = (code, language) => {
  let match;
  switch (language) {
    case "javascript":
      match =
        code.match(/function\s+(\w+)\s*\(/) || code.match(/const\s+(\w+)\s*=/);
      break;
    case "python":
      match = code.match(/def\s+(\w+)\s*\(/);
      break;
    case "java":
      match = code.match(/public\s+\w+(?:\[\])?\s+(\w+)\s*\(/);
      break;
    case "cpp":
      match = code.match(/\w+(?:\s*\*)?\s+(\w+)\s*\(/);
      break;
    default:
      return null;
  }
  return match ? match[1] : null;
};

// Generate dynamic wrapper based on problem input/output structure
const wrapUserCode = (userCode, language, testCases, problemId) => {
  // Extract function name from user's code
  const functionName = extractFunctionName(userCode, language);

  if (!functionName) {
    throw new Error(
      "Could not detect function name. Please ensure your function is properly defined.",
    );
  }

  // Detect input structure from first test case
  const firstTest = testCases[0];
  const inputKeys = Object.keys(firstTest.input);

  switch (language) {
    case "javascript":
      // Build function call dynamically based on input keys
      const jsParams = inputKeys.map((key) => `tc.input.${key}`).join(", ");

      return `
${userCode}

// Test execution
const testCases = ${JSON.stringify(testCases)};
const results = testCases.map(tc => {
  try {
    const result = ${functionName}(${jsParams});
    return JSON.stringify(result);
  } catch (e) {
    return JSON.stringify({ error: e.message });
  }
});
console.log(results.join('\\n---\\n'));
`;

    case "python":
      const pyParams = inputKeys
        .map((key) => `tc['input']['${key}']`)
        .join(", ");

      return `
${userCode}

import json

test_cases = ${JSON.stringify(testCases)}
results = []
for tc in test_cases:
    try:
        result = ${functionName}(${pyParams})
        results.append(json.dumps(result))
    except Exception as e:
        results.append(json.dumps({'error': str(e)}))

print('\\n---\\n'.join(results))
`;

    case "java":
      // Extract only the method from user code
      let methodCode = userCode;

      // Remove class wrapper if present
      if (
        userCode.includes("public class") ||
        userCode.includes("class Solution")
      ) {
        // Try to extract just the method(s)
        const classContentMatch = userCode.match(/class\s+\w+\s*\{([\s\S]*)\}/);
        if (classContentMatch) {
          methodCode = classContentMatch[1].trim();
          // Remove main method if present
          methodCode = methodCode.replace(
            /public\s+static\s+void\s+main\s*\([^)]*\)\s*\{[\s\S]*?\}\s*(?=public|private|\}|$)/g,
            "",
          );
        }
      }

      // Create stdin input based on test case structure
      // eslint-disable-next-line no-case-declarations
      const testInputs = testCases
        .map((tc) => {
          return JSON.stringify(tc.input);
        })
        .join("\n");

      return {
        sourceCode: `
import java.util.*;
import com.google.gson.*;

public class Solution {
${methodCode}

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Solution solution = new Solution();
        Gson gson = new Gson();
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            
            try {
                JsonObject input = gson.fromJson(line, JsonObject.class);
                
                // Call function with dynamic parameters
                Object result = solution.${functionName}(/* parse inputs from JSON */);
                System.out.println(gson.toJson(result));
                System.out.println("---");
            } catch (Exception e) {
                System.out.println("{\\"error\\": \\"" + e.getMessage() + "\\"}");
                System.out.println("---");
            }
        }
        scanner.close();
    }
}
`,
        stdin: testInputs,
      };

    case "cpp":
      testCases.map((tc) => JSON.stringify(tc)).join(",\n");

      return `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

${userCode}

int main() {
    // Test cases will be executed here
    // Implementation depends on input/output types
    
    cout << "CPP execution - Please use JavaScript or Python for now" << endl;
    return 0;
}
`;

    default:
      return userCode;
  }
};

// Helper function to parse output from code execution
const parseOutput = (output) => {
  if (!output) return [];

  // Split by delimiter and clean up
  const parts = output
    .split("---")
    .map((s) => s.trim())
    .filter((s) => s);

  return parts.map((part) => {
    let cleaned;
    try {
      cleaned = part.trim();
      return JSON.parse(cleaned);
    } catch {
      // If JSON parsing fails, try to extract array from string
      const match = cleaned.match(/\[([^\]]*)\]/);
      if (match) {
        try {
          return JSON.parse(`[${match[1]}]`);
        } catch {
          // Return as string if all parsing fails
          return cleaned;
        }
      }
      return cleaned;
    }
  });
};

// Helper function to compare values (handles arrays, objects, primitives)
const valuesEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!valuesEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (let key of keysA) {
      if (!valuesEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
};

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
      selectedProblem.functionSignature?.[language] ||
      "// Write your code here"
    );
  });

  // Update code when currentQIndex or language changes
  useEffect(() => {
    // First check if there's submitted code for this question
    const submittedCode = localStorage.getItem(
      `submitted_code_${selectedProblem.id}`,
    );

    // Then check language-specific saved code
    const saved = localStorage.getItem(`code_${language}_${currentQIndex}`);

    // Priority: submitted code > saved code > function signature > template
    setCode(
      submittedCode ||
        saved ||
        (selectedProblem.functionSignature
          ? selectedProblem.functionSignature[language]
          : languageTemplates?.[language]) ||
        "// Write your code here",
    );

    // Clear output when switching questions
    setShowResult(false);
    setOutput(null);
  }, [currentQIndex, language, selectedProblem]);

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
    console.log("🔥 STEP 0: handleRun triggered");

    const userCode = editorRef.current?.getValue();
    console.log("🔥 STEP 1: userCode fetched", userCode);

    if (!userCode) {
      console.log("❌ STEP 2: No userCode");
      setOutput("Error: No code provided.");
      setShowResult(true);
      return;
    }

    console.log("✅ STEP 2: userCode exists");

    if (language === "java" && !isValidJavaCode(userCode)) {
      console.log("❌ STEP 3: Invalid Java code");
      setOutput(
        "Error: Please provide a valid Solution class with a twoSum method.",
      );
      setShowResult(true);
      return;
    }

    console.log("✅ STEP 3: Java validation passed");

    setIsLoading(true);
    setShowResult(false);
    console.log("🔥 STEP 4: Loading started");

    try {
      const results = [];
      const testCases = selectedProblem.testCases;

      console.log("🔥 STEP 5: testCases", testCases);

      const wrapped = wrapUserCode(
        userCode,
        language,
        testCases,
        selectedProblem.id,
      );

      console.log("🔥 STEP 6: wrapped code", wrapped);

      let sourceCode = wrapped;
      let stdin = "";

      if (language === "java") {
        sourceCode = wrapped.sourceCode;
        stdin = wrapped.stdin;
        console.log("🔥 STEP 7: Java mode", sourceCode, stdin);
      }

      console.log("🔥 STEP 8: Calling executeCode");

      const response = await executeCode(language, sourceCode, stdin);

      console.log("🔥 STEP 9: Raw response", response);

      const run = response.run;
      console.log("🔥 STEP 10: run object", run);

      if (!run) {
        console.log("❌ STEP 11: run is undefined");
        throw new Error("No run object returned from API");
      }

      if (run.stderr && run.stderr.trim()) {
        console.log("❌ STEP 12: stderr found", run.stderr);
        setOutput(`Error:\n${run.stderr}`);
        setShowResult(true);
        setIsLoading(false);
        return;
      }

      if (!run.output || run.output.trim() === "") {
        console.log("❌ STEP 13: No output", run.output);
        setOutput("Error: No output received. Please check your code.");
        setShowResult(true);
        setIsLoading(false);
        return;
      }

      console.log("✅ STEP 14: Output received", run.output);

      const outputs = parseOutput(run.output);
      console.log("🔥 STEP 15: Parsed outputs", outputs);

      testCases.forEach((testCase, i) => {
        const actual = outputs[i];
        const passed = valuesEqual(actual, testCase.expected);

        console.log(`🔥 STEP 16: Test ${i}`, {
          input: testCase.input,
          expected: testCase.expected,
          actual,
          passed,
        });

        results.push({ ...testCase, actual, passed });
      });

      console.log("🔥 STEP 17: Final results", results);

      const inputKeys = Object.keys(testCases[0].input);

      setOutput(
        results
          .map((r, i) => {
            const inputStr = inputKeys
              .map((key) => `${key}=${JSON.stringify(r.input[key])}`)
              .join(", ");
            return (
              `Test Case ${i + 1}: ${r.passed ? "✅ Passed" : "❌ Failed"}\n` +
              `Input: ${inputStr}\n` +
              `Expected: ${JSON.stringify(r.expected)}\n` +
              `Got: ${JSON.stringify(r.actual)}`
            );
          })
          .join("\n\n"),
      );

      console.log("✅ STEP 18: Output set successfully");

      setShowResult(true);
    } catch (err) {
      console.log("❌ STEP ERROR:", err);
      setOutput(`Error: ${err.message}`);
      setShowResult(true);
    } finally {
      console.log("🔥 STEP FINAL: Loading false");
      setIsLoading(false);
    }
  };

  const clearTestData = () => {
    localStorage.removeItem("selectedTopic");
    localStorage.removeItem("selectedLevel");

    // Clear all code caches
    if (languageTemplates) {
      Object.keys(languageTemplates).forEach((lang) => {
        selectedQuestions?.forEach((_, idx) => {
          localStorage.removeItem(`code_${lang}_${idx}`);
        });
      });
    }

    // Clear all submitted codes
    selectedQuestions?.forEach((q) => {
      localStorage.removeItem(`submitted_code_${q.id}`);
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
        id: q.id,
        problem_title: q.title,
        user_code: savedCode,
      };
    });

    console.log(submittedData);
    try {
      const response = await axios.post(
        "http://localhost:7654/test/save-submission",
        submittedData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200) {
        alert("✅ Test submitted successfully!");
        clearTestData();
        navigate("/analysis", {
          state: { submittedData },
        });
      } else {
        alert("⚠️ Something went wrong while submitting the test.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Failed to submit test. Please try again later.");
    }
  };

  const handleSubmitCode = () => {
    if (!selectedProblem) return;

    const currentCode = editorRef.current.getValue();
    const submittedCodeKey = `submitted_code_${selectedProblem.id}`;
    localStorage.setItem(submittedCodeKey, currentCode);

    alert(`✅ Code submitted for: ${selectedProblem.title}`);
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 9999999,
        }}
      >
        <button
          onClick={() => {
            console.log("BUTTON CLICKED");
            handleRun()
          }}
          style={{
            padding: "15px 25px",
            fontSize: "16px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          RUN TEST
        </button>
      </div>
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
              sx={{
                fontSize: "0.95rem",
                fontWeight: 500,
                opacity: 0.9,
                mb: 0.5,
              }}
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
              <Box
                display="flex"
                gap={2}
                pb={2}
                sx={{ borderBottom: "1px solid grey" }}
              >
                {selectedQuestions?.map((q, idx) => {
                  const isSubmitted = localStorage.getItem(
                    `submitted_code_${q.id}`,
                  );
                  return (
                    <Box
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        backgroundColor:
                          idx === currentQIndex
                            ? "#00cba9"
                            : isSubmitted
                              ? "#4caf50"
                              : "#ccc",
                        color:
                          idx === currentQIndex || isSubmitted
                            ? "#fff"
                            : "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        cursor: "pointer",
                        userSelect: "none",
                        border: isSubmitted ? "2px solid #2e7d32" : "none",
                      }}
                    >
                      {idx + 1}
                    </Box>
                  );
                })}
              </Box>

              {/* Question Details */}
              <Paper
                elevation={0}
                sx={{ padding: 2, backgroundColor: "#f5f5f5" }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  {selectedProblem.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedProblem.description}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                  Examples
                </Typography>
                {selectedProblem.testCases?.map((tc, idx) => (
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

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <CodeEditor
              height="60vh"
              options={{ lineHeight: 30 }}
              language={language}
              value={code}
              onChange={(newCode) => {
                setCode(newCode);
                localStorage.setItem(
                  `code_${language}_${currentQIndex}`,
                  newCode,
                );
              }}
              onMount={onMount}
              theme="vs-light"
            />
          </Box>
          {/* Run / Submit Buttons */}
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            sx={{
              marginTop: "auto",
              padding: 2,
              backgroundColor: "#f5f5f5",
              position: "relative",
              zIndex: 10, // 🔥 VERY IMPORTANT
            }}
          >
            {/* <p
              variant="contained"
              color="success"
              onClick={() => {
                console.log("BUTTON CLICKED");
                handleRun();
              }}
            >
              Run
            </p>{" "} */}
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmitCode();
                console.log("first");
              }}
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
