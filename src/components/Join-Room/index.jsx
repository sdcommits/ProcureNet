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




// import { useState } from 'react';
// import styles from './styles.module.css'; // Ensure you have the relevant styles in this file

// function JoinRoom() {
//   const [roomCode, setRoomCode] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     // Simulating API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // For demonstration, always show error
//     setError('Invalid room code or password');
//   };

//   return (
// <<<<<<< HEAD
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
//       <h2>Join Auction Room</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label htmlFor="roomCode">Room Code</label>
//           <input
//             type="text"
//             id="roomCode"
//             value={roomCode}
//             onChange={(e) => setRoomCode(e.target.value)}
//             required
//             placeholder="Enter Room Code"
//           />
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter Room Password"
//           />
//         </div>
//         <button type="submit" style={{ marginTop: '10px' }}>
//           Join Room
//         </button>
//         {error && (
//           <p
//             style={{ color: 'red', marginTop: '10px' }}
//             aria-live="polite"
//           >
//             {error}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default JoinRoom;

// =======
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h2 className={styles.title}>Join Auction Room</h2>
//         <p className={styles.description}>Enter the room code and password to join</p>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.inputGroup}>
//             <label htmlFor="roomCode" className={styles.label}>Room Code</label>
//             <input
//               id="roomCode"
//               type="text"
//               placeholder="Enter Room Code"
//               value={roomCode}
//               onChange={(e) => setRoomCode(e.target.value)}
//               required
//               className={styles.input}
//             />
//           </div>
//           <div className={styles.inputGroup}>
//             <label htmlFor="password" className={styles.label}>Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter Room Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className={styles.input}
//             />
//           </div>
//           <button type="submit" className={styles.button}>
//             Join Room
//           </button>
//         </form>
//         {error && (
//           <div className={styles.error}>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
//               <circle cx="12" cy="12" r="10"></circle>
//               <line x1="12" y1="8" x2="12" y2="12"></line>
//               <line x1="12" y1="16" x2="12.01" y2="16"></line>
//             </svg>
//             <p>{error}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// >>>>>>> 5180ea14466fb2b76a4187776e43f0f10ea6a898



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
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Join Auction Room</h2>
        <p className={styles.description}>Enter the room code and password to join</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="roomCode" className={styles.label}>Room Code</label>
            <input
              id="roomCode"
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Room Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Join Room
          </button>
        </form>
        {error && (
          <div className={styles.error}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoinRoom;
