import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Register request received:', { username, email, password });

  if (!username || !email || !password) {
    console.log('Missing fields in register request');
    return res.status(400).json({ msg: 'Please provide username, email, and password' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password, // Password will be hashed in the User model
    });

    await user.save();
    console.log('User registered successfully:', user);

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from environment variables
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Error signing token:', err);
          throw err;
        }
        console.log('Token generated successfully');
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error('Server error during registration:', error.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, password });

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid credentials: user not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Invalid credentials: password mismatch');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from environment variables
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Error signing token:', err);
          throw err;
        }
        console.log('Token generated successfully');
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Server error during login:', error.message);
    res.status(500).send('Server error');
  }
});

export default router;