import express from 'express';
import connectDB from './db/index.js';
import cors from 'cors';
import authRouter from "./routes/auth.js";
import testRouter from "./routes/testRoute.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Proper CORS setup (VERY IMPORTANT)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle preflight requests
// app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Connect Database
connectDB();

// ✅ Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to home route" });
});

app.use("/user", authRouter);
app.use("/test", testRouter);

// ✅ Server start
const port = 7654;

app.listen(port, () => {
  console.log("first");
  console.log(`App is listening at http://localhost:${port}`);
});