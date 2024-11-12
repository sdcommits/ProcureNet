const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const main = require('./db');
const registerRouter = require('./routes/user.registerRoute');
const loginRouter = require('./routes/user.loginRoute');
const auctionRoomRoutes = require('./routes/auctionRoomRoute');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Route definitions
app.use('/api/auction', auctionRoomRoutes); // More specific route path for auction-related routes
app.use('/login', loginRouter);
app.use('/signup', registerRouter);

// Basic route to verify server is running
app.get('/', (req, res) => {
    res.send("This is the homepage");
});

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
});

// Start the server and initialize database connection
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    try {
        await main(); // Connect to the database
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});
