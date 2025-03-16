const express = require('express');
const connectDB = require('./Config/db'); // Import database connection
const authRoutes = require('./router/authRoutes'); // Ensure path is correct
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Add Debug Route
app.get('/', (req, res) => {
    res.send("✅ API is running...");
});

// ✅ Ensure auth routes are registered
app.use('/api/auth', authRoutes);


// ✅ Log the port number correctly
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
