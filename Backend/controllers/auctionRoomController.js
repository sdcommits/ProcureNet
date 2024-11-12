const AuctionRoom = require('../models/auctionRoom.model');
const crypto = require('crypto');

// Generate a unique room ID
async function generateUniqueRoomId() {
    let room_Id;
    let roomExists;

    do {
        room_Id = crypto.randomBytes(6).toString('hex'); // Generates a 12-character hexadecimal string
        // Check if the room ID already exists
        roomExists = await AuctionRoom.findOne({ room_Id: room_Id });
    } while (roomExists || room_Id === null); // Repeat if the room ID already exists

    return room_Id;
}

// Create a new auction room
exports.createAuctionRoom = async (req, res) => {
    try {
        // Generate and set a unique room ID
        req.body.room_Id = await generateUniqueRoomId();
        console.log("Generated Room ID:", req.body.room_Id);

        // Create the auction room
        const auctionRoom = new AuctionRoom(req.body);
        await auctionRoom.save();
        
        res.status(201).json({ message: 'Auction room created successfully', auctionRoom });
    } catch (error) {
        console.error("Error creating auction room:", error);
        res.status(400).json({ error: error.message });
    }
};

// Get all auction rooms
exports.getAuctionRooms = async (req, res) => {
    try {
        const auctionRooms = await AuctionRoom.find();
        res.status(200).json(auctionRooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single auction room by ID
exports.getAuctionRoomById = async (req, res) => {
    try {
        const auctionRoom = await AuctionRoom.findOne({ roomCode: req.params.roomCode });
        if (!auctionRoom) {
            return res.status(404).json({ message: "Auction room not found" });
        }
        res.json(auctionRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update an auction room by ID
exports.updateAuctionRoom = async (req, res) => {
    try {
        const auctionRoom = await AuctionRoom.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!auctionRoom) {
            return res.status(404).json({ message: 'Auction room not found' });
        }
        res.status(200).json({ message: 'Auction room updated successfully', auctionRoom });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an auction room by ID
exports.deleteAuctionRoom = async (req, res) => {
    try {
        const auctionRoom = await AuctionRoom.findByIdAndDelete(req.params.id);
        if (!auctionRoom) {
            return res.status(404).json({ message: 'Auction room not found' });
        }
        res.status(200).json({ message: 'Auction room deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
