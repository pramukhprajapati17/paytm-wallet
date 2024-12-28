const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');  // Importing routes

app.use('/api', authRoutes);

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // To parse x-www-form-urlencoded bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('DB Connection Error:', err));

// Define User model schema
const UserSchema = new mongoose.Schema({
  unique_id: { 
    type: String, 
    default: () => crypto.randomBytes(16).toString('hex') + '@okwallet' 
  },
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  identity: { type: String, required: true },
  id_number: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  balance: { type: Number, default: 500 }
});
const User = mongoose.model('User', UserSchema);

// Routes

// Register Route
app.post('/api/register', async (req, res) => {
  const { f_name, l_name, email, mobile, identity, id_number, address, password } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      f_name,
      l_name,
      email,
      mobile,
      identity,
      id_number,
      address,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});