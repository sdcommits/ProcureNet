// import React from "react";
// import Tilt from "react-parallax-tilt";
// import { motion } from "framer-motion";
// import { fadeIn } from "../utils/motion";
// import { useNavigate } from "react-router-dom";

// const ServiceCard = ({ index, title, icon }) => {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     if (title === "Join Room") {
//       navigate("/join-room");
//     } else if (title === "Create Room") {
//       navigate("/create-room");
//     } else {
//       navigate(`/${title.replace(/\s+/g, "-").toLowerCase()}`);
//     }
//   };

//   return (
//     <Tilt className="xs:w-[250px] w-full">
//       <motion.div
//         variants={fadeIn("right", "spring", index * 0.5, 0.75)}
//         className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
//       >
//         <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
//           <img src={icon} alt={title} className="w-16 h-16 object-contain" />
//           <h3 className="text-white text-[20px] font-bold text-center">
//             {title}
//           </h3>
//           <button
//             className="mt-4 bg-transparent border border-blue-500 py-2 px-4 text-lg rounded-lg hover:bg-[#4b2b8f] hover:text-white transition"
//             onClick={handleButtonClick}
//             aria-label={`View details about ${title}`}
//           >
//             View Details
//           </button>
//         </div>
//       </motion.div>
//     </Tilt>
//   );
// };

// export default ServiceCard;



import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ServiceCard = ({ index, title, icon }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Redirecting to login page...");
      navigate("/login");
      return;
    }

    try {
      // Decode the token to check validity (optional validation step)
      jwt_decode(token);

      // Navigate to the appropriate route based on the button's title
      if (title === "Join Room") {
        navigate("/join-room");
      } else if (title === "Create Room") {
        navigate("/create-room");
      } else {
        navigate(`/${title.replace(/\s+/g, "-").toLowerCase()}`);
      }
    } catch (error) {
      // Handle invalid or expired token
      console.error("Invalid token. Redirecting to login page...");
      alert("Your session has expired. Please log in again.");
      navigate("/login");
    }
  };

  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
          <button
            className="mt-4 bg-transparent border border-blue-500 py-2 px-4 text-lg rounded-lg hover:bg-[#4b2b8f] hover:text-white transition"
            onClick={handleButtonClick}
            aria-label={`View details about ${title}`}
          >
            View Details
          </button>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default ServiceCard;
