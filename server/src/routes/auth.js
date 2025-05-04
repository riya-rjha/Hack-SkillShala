// require("dotenv").config();
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

// connectDB();
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!email || !name || !password) {
      return res.status(404).json({
        status: "fail",
        message: "All fields are required"
      })
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already exists', name: userExists.name },);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET);

    return res.status(201).json({ message: 'Signup successful!', token, name: name });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    // Send back name too
    return res.status(200).json({
      message: 'Login successful',
      token,
      name: user.name
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


export default router;
