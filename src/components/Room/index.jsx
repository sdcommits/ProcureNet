import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import herobg from "../../assets/herobg.png";

const Room = () => {
  const { roomId } = useParams();
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState("No bids yet");
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [newBid, setNewBid] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const timerRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8080");
    wsRef.current.onopen = () => console.log("WebSocket connection established");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "newBid" && data.roomId === roomId) {
        setHighestBid(data.bidAmount);
        setHighestBidder(data.userName);
      }
    };
    wsRef.current.onclose = () => console.log("WebSocket connection closed");
    return () => wsRef.current.close();
  }, [roomId]);

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/auction/auction-rooms/${roomId}`);
        if (response.ok) {
          const data = await response.json();
          setHighestBid(data.highestBid || 0);
          setHighestBidder(data.highestBidder || "No bids yet");
          setJoinedUsers(data.joinedUsers || []);
          setTimeLeft(data.timelimit || 0);
          setPassword(data.password || "");
        } else {
          console.error("Failed to fetch auction data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };
    fetchAuctionData();
  }, [roomId]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!auctionEnded) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            endAuction();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [auctionEnded]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const placeBid = () => {
    const bidAmount = parseFloat(newBid);
    if (bidAmount > highestBid) {
      setHighestBid(bidAmount);
      setHighestBidder(userName || "Anonymous");
      wsRef.current.send(
        JSON.stringify({
          type: "newBid",
          bidAmount,
          userName,
          roomId,
        })
      );
    } else {
      alert("Bid must be higher than the current highest bid.");
    }
    setNewBid("");
  };

  const endAuction = () => {
    setAuctionEnded(true);
    clearInterval(timerRef.current);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${herobg})`,
      }}
    >
      <div className={styles.tagline}>The Treasure Chase – Bid Your Way to the Top!</div>
      <div className={styles.roomInfo}>
        <h2>Room ID: {roomId}</h2>
        <p>Password: {password}</p>
      </div>

      <div className={styles.productBox}>Product Information Here</div>

      <div className={styles.timer}>
        <p>Auction Room ends in: {formatTime(timeLeft)}</p>
      </div>

      <div className={styles.bidSection}>
        <h3>Highest Bid: ${highestBid}</h3>
        <p>Highest Bidder: {highestBidder}</p>
        <input
          type="text"
          placeholder="Enter your bid"
          value={newBid}
          onChange={(e) => setNewBid(e.target.value)}
          disabled={auctionEnded}
        />
        <button onClick={placeBid} disabled={auctionEnded || !newBid}>
          Place Bid
        </button>
      </div>

      <div className={styles.joinedUsers}>
        <h4>Joined Users</h4>
        <ul>
          {joinedUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>

      {auctionEnded && <div className={styles.auctionEnded}>Auction Ended!</div>}
    </div>
  );
};

export default Room;
