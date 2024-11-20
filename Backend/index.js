const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const main = require('./db');
const registerRouter = require('./routes/user.registerRoute');
const loginRouter = require('./routes/user.loginRoute');
const auctionRoomRoutes = require('./routes/auctionRoomRoute');
const productRoutes = require('./routes/productRoutes');
const AuctionRoom = require('./models/auctionRoom.model'); // Add AuctionRoom model

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auction', auctionRoomRoutes);
app.use('/login', loginRouter);
app.use('/signup', registerRouter);
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to the Auction System API!");
});

// WebSocket Connection Handling
wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');
  
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
  
        if (data.type === 'newBid') {
          // Update highest bid and bidder in the database
          // Ensure the filter is an object, with roomId as a key
          
          await AuctionRoom.findOneAndUpdate(
            { roomId: data.roomId },  // Proper filter format
            {
              highestBid: data.bidAmount,
              highestBidder: data.bidder,
            }
          );
  
          // Broadcast the updated bid
          broadcast({
            type: 'newBid',
            roomId: data.roomId,
            bidAmount: data.bidAmount,
            bidder: data.bidder,
          });
        } else if (data.type === 'newUser') {
            console.log(data);
          // Add new user to joinedUsers in the database
          const room = await AuctionRoom.findOne({ roomId: data.roomId }); // Ensure the filter is an object
          if (room && !room.joinedUsers.includes(data.username)) {
            room.joinedUsers.push(data.username);
            await room.save();
  
            // Broadcast notification for new user joining
            broadcast({
              type: 'newUser',
              roomId: data.roomId,
              username: data.username,
            });
          }
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error.message);
      }
    });
  
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
  
  // Broadcast function
  const broadcast = (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };
  

// Global error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, async () => {
  try {
    await main();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
});
