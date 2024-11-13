const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const main = require('./db');
const registerRouter = require('./routes/user.registerRoute');
const loginRouter = require('./routes/user.loginRoute');
const auctionRoomRoutes = require('./routes/auctionRoomRoute');
const http = require('http');
const WebSocket = require('ws');

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app); // Use http server to integrate with WebSocket
const wss = new WebSocket.Server({ server }); // WebSocket server

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Route definitions
app.use('/api/auction', auctionRoomRoutes); 
app.use('/login', loginRouter);
app.use('/signup', registerRouter);

// Basic route to verify server is running
app.get('/', (req, res) => {
    res.send("This is the homepage");
});

// WebSocket Connection Handling
wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'newBid') {
            // Broadcast the new bid to all clients
            broadcast(JSON.stringify({
                type: 'newBid',
                bidAmount: data.bidAmount,
                bidder: data.bidder,
            }));
        } else if (data.type === 'auctionEnd') {
            // Notify all clients that the auction has ended
            broadcast(JSON.stringify({
                type: 'auctionEnd',
                roomId: data.roomId,
            }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to broadcast messages to all connected clients
const broadcast = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
});

// Start the server and initialize database connection
const PORT = process.env.PORT || 8080;
server.listen(PORT, async () => {
    try {
        await main(); // Connect to the database
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});
