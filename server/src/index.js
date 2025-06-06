import express from 'express';
import connectDB from './db/index.js';
import cors from 'cors';
import authRouter from "./routes/auth.js";
import testRouter from "./routes/testRoute.js"; // ✅ import testRoute

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

connectDB();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to home route" });
});

app.use("/user", authRouter);
app.use("/test", testRouter); // ✅ register testRoute

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
