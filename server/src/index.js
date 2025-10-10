import path from 'path';
import dotenv from 'dotenv';

// Force dotenv to load the .env file from the current directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import express from 'express';
import connectDB from './db/index.js';
import cors from 'cors';
import authRouter from "./routes/auth.js";
import testRouter from "./routes/testRoute.js";
import geminiRouter from "./routes/gemini.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// This will now run with the correct environment variables loaded
connectDB(); 

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to home route" });
});

app.use("/user", authRouter);
app.use("/test", testRouter);
app.use("/gemini", geminiRouter);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});