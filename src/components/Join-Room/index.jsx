import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JoinRoom.css"; // Import the updated CSS file
import herobg from "../../assets/herobg.png";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      // Backend API call for room validation
      const response = await axios.post("/api/auction/join", { roomCode, password });

      if (response.data.success) {
        navigate(`/auction-room/${roomCode}`);
      } else {
        setError(response.data.message || "Invalid room code or password");
      }
    } catch (err) {
      setError("Error joining the room. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div
      className="room_container"
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="join-room-container">
        <h2>Join Auction Room</h2>
        <form className="join-room-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="roomCode">Room Code</label>
            <input
              type="text"
              id="roomCode"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              required
              placeholder="Enter Room Code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Room Password"
            />
          </div>
          <button className="join-room-button" type="submit">
            Join Room
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
