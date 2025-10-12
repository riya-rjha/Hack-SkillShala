import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import problems from "../data.json";

const topicsList = [
  "Array",
  "String",
  "Linked List",
  "Tree",
  "Graph",
  "Dynamic Programming",
  "Sorting & Searching",
];

const difficultyOrder = ["easy", "medium", "hard"];

const TestSetup = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState(localStorage.getItem("selectedTopic") || "");
  const [level, setLevel] = useState(localStorage.getItem("selectedLevel") || "");

  // Save to localStorage on change
  useEffect(() => {
    if (topic) localStorage.setItem("selectedTopic", topic);
    if (level) localStorage.setItem("selectedLevel", level);
  }, [topic, level]);


    const filterQuestions = (questions, selectedTopic, selectedLevel, limit = 3) => {
        const topicLower = selectedTopic.toLowerCase();
        const selectedLevelLower = selectedLevel.toLowerCase();

        const levelIndex = difficultyOrder.indexOf(selectedLevelLower);

        if (levelIndex === -1) return [];

        let selectedQuestions = [];

        // Step 1: Try to pick 1 question of the selected level
        const candidatesCurrent = questions.filter(
            (q) =>
                q.topic.toLowerCase().includes(topicLower) &&
                q.difficulty.toLowerCase() === selectedLevelLower
        );

        if (candidatesCurrent.length > 0) {
            const shuffledCurrent = candidatesCurrent.sort(() => 0.5 - Math.random());
            selectedQuestions.push(shuffledCurrent[0]);
        }

        // Step 2: Pick remaining questions from higher levels only
        const remainingCount = limit - selectedQuestions.length;

        if (remainingCount > 0) {
            // Gather all higher level questions
            let higherCandidates = [];
            for (let i = levelIndex + 1; i < difficultyOrder.length; i++) {
                const level = difficultyOrder[i];
                higherCandidates = higherCandidates.concat(
                    questions.filter(
                        (q) =>
                            q.topic.toLowerCase().includes(topicLower) &&
                            q.difficulty.toLowerCase() === level
                    )
                );
            }

            // Shuffle and pick remaining
            const shuffledHigher = higherCandidates.sort(() => 0.5 - Math.random());
            selectedQuestions = selectedQuestions.concat(
                shuffledHigher.slice(0, remainingCount)
            );
        }

        // Return the final array (could be less than limit if not enough questions)
        return selectedQuestions;
    };



  const handleStart = () => {
    if (!topic || !level) {
      alert("Please select both topic and level.");
      return;
    }
    const selectedQuestions = filterQuestions(problems, topic, level, 3);
    if (selectedQuestions.length === 0) {
      alert("No questions available for this topic and level.");
      return;
    }

    navigate("/test", { state: { topic, level, selectedQuestions } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2e2e5d",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: "420px",
          borderRadius: "20px",
          backgroundColor: "white",
          textAlign: "center",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 4,
            fontWeight: "bold",
            color: "#2e2e5d",
          }}
        >
          Select Your Test
        </Typography>

        <FormControl
          fullWidth
          sx={{
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        >
          <InputLabel>Topic</InputLabel>
          <Select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            label="Topic"
          >
            {topicsList.map((t, index) => (
              <MenuItem key={index} value={t.toLowerCase()}>
                {t.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          sx={{
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        >
          <InputLabel>Level</InputLabel>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            label="Level"
          >
            {difficultyOrder.map((l, index) => (
              <MenuItem key={index} value={l.toLowerCase()}>
                {l.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          onClick={handleStart}
          sx={{
            mt: 2,
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "12px",
            backgroundColor: "#00cba9",
            color: "white",
            "&:hover": { backgroundColor: "#00b89c" },
          }}
        >
          Start Test
        </Button>
      </Paper>
    </Box>
  );
};

export default TestSetup;
