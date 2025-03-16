const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const User = require('../Model/User'); // Import User model

// Signup Controller Function
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, // Store hashed password
        });

        

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Login in controller 
const login = async (req,res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ message: "Logged in successfully", user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
}
module.exports = { signup , login}; // Export the signup function
