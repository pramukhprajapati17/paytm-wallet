const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse x-www-form-urlencoded bodies

// MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URL;

// Connect to MongoDB
mongoConnect(mongoURI);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function mongoConnect(mongoURI) {
    mongoose.connect(mongoURI)
        .then(() => console.log("Atlas connected!"))
        .catch(error => console.log("Database connection error:", error));
}

// Function to generate unique ID for each user
function generateUniqueId() {
    const randomBytes = crypto.randomBytes(16).toString('hex');
    return randomBytes + '@okwallet';
}

// Define a schema for the User model
const UserSchema = new mongoose.Schema({
    unique_id: { type: String, default: generateUniqueId },
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    identity: { type: String, required: true },
    id_number: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },  // No hashing of password
    date: { type: Date, default: Date.now },
    balance: { type: Number, default: 500 }
});

const User = mongoose.model('User', UserSchema);

// API Routes

// Get all users (just for testing)
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Register API route
app.post('/api/register', async (req, res) => {
    const { f_name, l_name, email, mobile, identity, id_number, address, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create a new user object with plain password
        const newUser = new User({
            f_name,
            l_name,
            email,
            mobile,
            identity,
            id_number,
            address,
            password  // Store plain password directly
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
});