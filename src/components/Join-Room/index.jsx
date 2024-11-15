import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handler for the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            // Make a request to the backend to verify room code and password
            const response = await axios.post('/api/auction/join', {
                roomCode,
                password,
            });

            if (response.data.success) {
                // Redirect to the auction room if successful
                navigate(`/auction-room/${roomCode}`);
            } else {
                // Show error if authentication fails
                setError(response.data.message || 'Invalid room code or password');
            }
        } catch (err) {
            setError('Error joining the room. Please try again later.');
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Join Auction Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
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
                <button type="submit">Join Room</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default JoinRoom;
