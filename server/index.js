const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const User = require('./models/User');

  app.post('/login', async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

const bcrypt = require('bcrypt');

app.post('/signup', async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailId });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ emailId, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signed up successfully' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: 'Server error' });
  }
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});