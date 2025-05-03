import express from "express";
import { Ques } from "../models/ques.js";
import { Test } from "../models/test.js";

const router = express.Router();

// Start a new test
router.post("/", async (req, res) => {
    try {
        const { topic } = req.body;
        const test = await Test.create({ topic });
        res.status(200).json({
            status: "success",
            message: "Test started",
            test
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Test is unable to start",
            error: error.message
        });
    }
});

// Submit a question attempt in a test
router.post("/:topic/:title/submit", async (req, res) => {
    try {
        const { topic, title } = req.params;
        const { code, correctTestcases, wrongTestcases } = req.body;

        if (!title || !code || correctTestcases === undefined || wrongTestcases === undefined) {
            throw new Error("Missing required fields");
        }

        const ques = await Ques.findOne({ title });
        if (!ques) throw new Error("Question not found");

        const test = await Test.findOne({ topic });
        if (!test) throw new Error("Test not started");

        test.attempted += 1;
        let status = false;

        if (wrongTestcases === 0) {
            test.correctQues += 1;
            status = true;
        } else {
            test.wrongQues += 1;
        }

        test.solvedQues.push({
            Question: ques._id,
            status,
            userCode: code
        });

        await test.save();

        res.status(201).json({
            status: "success",
            message: "Question submitted successfully"
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message || "Error in submitting question"
        });
    }
});

// Final test submission (optional if needed)
router.post("/:topic/submit", async (req, res) => {
    try {
        const { topic } = req.params;
        const test = await Test.findOne({ topic });

        if (!test) {
            return res.status(404).json({
                status: "fail",
                message: "No test found with this topic"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Test submitted successfully",
            test
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Failed to submit test",
            error: error.message
        });
    }
});

export default router;
