// 'use client'

// import { useState } from 'react'
// import styles from './styles.module.css'

// export default function JoinRoom() {
//   const [roomCode, setRoomCode] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)

//     // Simulating API call
//     await new Promise(resolve => setTimeout(resolve, 1000))

//     // For demonstration, always show error
//     setError('Invalid room code or password')
//   }

//     return (
//         <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
//             <h2>Join Auction Room</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="roomCode">Room Code</label>
//                     <input
//                         type="text"
//                         id="roomCode"
//                         value={roomCode}
//                         onChange={(e) => setRoomCode(e.target.value)}
//                         required
//                         placeholder="Enter Room Code"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         placeholder="Enter Room Password"
//                     />
//                 </div>
//                 <button type="submit">Join Room</button>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//             </form>
//         </div>
//     );
//     export default JoinRoom;
// };




import { useState } from 'react';
import styles from './styles.module.css'; // Ensure you have the relevant styles in this file

function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demonstration, always show error
    setError('Invalid room code or password');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Join Auction Room</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
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
        <div style={{ marginBottom: '15px' }}>
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
        <button type="submit" style={{ marginTop: '10px' }}>
          Join Room
        </button>
        {error && (
          <p
            style={{ color: 'red', marginTop: '10px' }}
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default JoinRoom;

