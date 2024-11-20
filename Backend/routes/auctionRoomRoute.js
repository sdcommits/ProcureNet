const express = require('express');
const auctionRoomController = require('../controllers/auctionRoomController');
const router = express.Router();


router.post('/create-room', auctionRoomController.createAuctionRoom);


router.get('/auction-rooms', auctionRoomController.getAuctionRooms);


router.get('/auction-rooms/:id', auctionRoomController.getAuctionRoomById);
router.put('/auction-rooms/:id', auctionRoomController.updateHighestBid);
module.exports = router;