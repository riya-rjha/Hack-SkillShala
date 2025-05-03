import express from "express";
import Ques from "../models/ques.js"
import Test from "../models/test.js"

const router = express.router;

router.post("/", async (req, res) => {
    try {
        const {topic} = req.body;
        const test = await Test.create({
            topic
        })
        res.status(200)
        .json({
            status: "success",
            message: "Test started"
        })
    } catch (error) {
        res.status(404)
        .json({
            status: "fail",
            message: "Test is unable to start"
        })
    }
})

router.post("/:topic/:title/submit", async (req, res) => {
    try {
        const {topic,title} = req.params;
        const {code, correctTestcases, wrongTestcases} = req.body;

        if(!title || !code || !correctTestcases || !wrongTestcases){
            throw new Error("Missing information");
        }

        const ques = await Ques.findOne({title});
        if(!ques){
            throw new Error("Question not found");
        }
        
        const test = await Test.findOne({topic});
        if(!test){
            throw new Error("Test not started");
        }
        
        test.attempted = test.attempted + 1;
        let status = false;
        if(wrongTestcases == 0){
            test.correctQues = test.correctQues + 1;
            status = true;
        }else{
            test.wrongQues = test.wrongQues + 1;
        }

        test.solvedQues.push({
            Question: ques,
            status,
            userCode : code
        });

        await test.save({validateBeforeSave: true});

        res
        .status(201)
        .json({
            status: "success",
            message
        })
        
    } catch (error) {
        res
        .status(400)
        .json({
            status: "fail",
            message: "Error is submitting question"
        })
    }
})

router.post("/:topic/submit", async (req, res) => {
    try {
        const {topic} = req.params;
        const test = await Test.findOne({topic});
        if(!test){
            throw new Error("No test found");
        }

    } catch (error) {
        
    }
})