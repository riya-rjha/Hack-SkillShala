import express from 'express';
import connectDB from './db/index.js';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());

connectDB();

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to home route" });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});