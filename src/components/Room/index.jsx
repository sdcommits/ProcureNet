import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";

const Room = () => {
  const { roomId } = useParams(); // Extract roomId from the route parameters
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState("No bids yet");
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0); // Initialize countdown time
  const [auctionEnded, setAuctionEnded] = useState(false); // State to track if auction ended
  const [newBid, setNewBid] = useState(""); // State for new bid input
  const [userName, setUserName] = useState(""); // State for bidder's name input
  const timerRef = useRef(null); // Ref to store the interval ID

  // Fetch room data when roomId changes 
  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/auction/auction-rooms/${roomId}`);
        
        if (response.ok) {
          const data = await response.json();
          setHighestBid(data.highestBid || 0);
          setHighestBidder(data.highestBidder || "No bids yet");
          setJoinedUsers(data.joinedUsers || []);
          setTimeLeft(data.timelimit || 0); // Assuming timelimit is in seconds
        } else {
          console.error("Failed to fetch auction data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    fetchAuctionData();
  }, [roomId]);

  // Timer to count down timeLeft
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (!auctionEnded) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            endAuction(); // End auction automatically when time runs out
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [auctionEnded]);

  // Format the countdown time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle bid submission
  const placeBid = () => {
    const bidAmount = parseFloat(newBid);

    if (bidAmount > highestBid) {
      setHighestBid(bidAmount);
      setHighestBidder(userName || "Anonymous");

      // Ideally, you'd also send this bid to the backend to update the auction data
      // e.g., await fetch(...) to send bidAmount and userName
    } else {
      alert("Bid must be higher than the current highest bid.");
    }
    setNewBid("");
  };

  // Handle auction end
  const endAuction = () => {
    setAuctionEnded(true);
    clearInterval(timerRef.current); // Stop the timer

    // Optionally, you can also send an end auction status to the backend
    // e.g., await fetch(...) to update auction status
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Auction Room {roomId}</h1>
        <p>Join the bidding and make your offer!</p>
      </header>

      {/* Display Room Details */}
      <section className={styles.roomInfo}>
        <p><strong>Room ID:</strong> {roomId}</p>
      </section>

      {/* Highest Bid Information */}
      <div className={styles.currentBid}>
        <p><strong>Highest Bid:</strong> ${highestBid}</p>
        <p><strong>Highest Bidder:</strong> {highestBidder}</p>
      </div>

      {/* Place Bid Section */}
      {!auctionEnded && (
        <div className={styles.placeBid}>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Enter bid amount" 
            value={newBid} 
            onChange={(e) => setNewBid(e.target.value)} 
          />
          <button onClick={placeBid}>Place Bid</button>
        </div>
      )}

      {/* Joined Users List */}
      <aside className={styles.userTable}>
        <h3>Joined Users</h3>
        <ul>
          {joinedUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </aside>

      {/* Countdown Timer and End Auction Button */}
      <footer className={styles.footer}>
        {auctionEnded ? (
          <p><strong>Auction Ended</strong></p>
        ) : (
          <>
            <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
            <button onClick={endAuction}>End Auction</button>
          </>
        )}
      </footer>

      {/* Display Winner Information after auction ends */}
      {auctionEnded && (
        <div className={styles.winnerBox}>
          <h2>Winner of the Auction</h2>
          <p><strong>Highest Bidder:</strong> {highestBidder}</p>
          <p><strong>Winning Bid:</strong> ${highestBid}</p>
        </div>
      )}
    </div>
  );
};

export default Room;
