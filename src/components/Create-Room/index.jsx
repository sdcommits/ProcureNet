import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import herobg from "../../assets/herobg.png";

const CreateAuctionRoom = () => {
  const [formData, setFormData] = useState({
    auction_Type: "",
    numberOfMembers: 2,
    registration_Number: "",
    timelimit: 1800,
    minbid_increment: 1,
    start_time: "",
    room_password: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple submits
  const navigate = useNavigate();

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    // Load form data from localStorage if available
    const savedFormData = JSON.parse(localStorage.getItem("createAuctionRoomData"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    // Save current form data to localStorage before navigating
    localStorage.setItem("createAuctionRoomData", JSON.stringify(formData));
    navigate("/add-product");
  };

  const handleRemoveProduct = (productToRemove) => {
    // Filter out the product to remove from the products array
    const updatedProducts = products.filter(product => product !== productToRemove);

    // Update localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Update state
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before making the API call

    try {
      const response = await axios.post("http://localhost:8080/api/auction/create-room", {
        ...formData,
        products,
      });

      console.log("Response from backend:", response);

      // Check if response contains the room ID
      if (response && response.data && response.data.auctionRoom) {
        const room_Id = response.data.room_Id;

        if (room_Id) {
          alert("Auction Room Created Successfully!");
         
          localStorage.removeItem("createAuctionRoomData"); // Clear form data on successful creation

          navigate(`/room/${room_Id}`);
        } else {
          alert("Room ID not found in response!");
        }
      } else {
        alert("Failed to create auction room. Please try again.");
      }
    } catch (error) {
      console.error("Error creating room:", error.response?.data?.message || error.message);
      alert("Error creating room. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after the request is completed
    }
  };

  return (
    <div
      className={styles.room_container}
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.create_room_container}>
        <h1 className={styles.header}>Create Auction Room</h1>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          {/* Auction Type and Number of Members */}
          <div className={styles.input_group}>
            <div className={styles.input_container}>
              <label>
                Auction Type:
                <select
                  name="auction_Type"
                  value={formData.auction_Type}
                  onChange={handleChange}
                  required
                  className={styles.input}
                >
                  <option value="">Select Auction Type</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </label>
            </div>

            <div className={styles.input_container}>
              <label>
                Number of Members:
                <input
                  type="number"
                  name="numberOfMembers"
                  value={formData.numberOfMembers}
                  onChange={handleChange}
                  min="2"
                  required
                  className={styles.input}
                />
              </label>
            </div>
          </div>

          {/* Registration Number and Time Limit */}
          <div className={styles.input_group}>
            <div className={styles.input_container}>
              <label>
                Registration Number:
                <input
                  type="text"
                  name="registration_Number"
                  value={formData.registration_Number}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            </div>

            <div className={styles.input_container}>
              <label>
                Time Limit (seconds):
                <input
                  type="number"
                  name="timelimit"
                  value={formData.timelimit}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            </div>
          </div>

          {/* Minimum Bid Increment and Start Time */}
          <div className={styles.input_group}>
            <div className={styles.input_container}>
              <label>
                Minimum Bid Increment:
                <input
                  type="number"
                  name="minbid_increment"
                  value={formData.minbid_increment}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            </div>

            <div className={styles.input_container}>
              <label>
                Start Time:
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            </div>
          </div>

          {/* Room Password */}
          <div className={styles.input_group}>
            <div className={styles.input_container}>
              <label>
                Create Password:
                <input
                  type="password"
                  name="room_password"
                  value={formData.room_password}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            </div>
          </div>

          {/* Add Product Section */}
          <div className={styles.product_input_container}>
            <button type="button" className={styles.add_product_btn} onClick={handleAddProduct}>
              Add Product
            </button>
          </div>

          {/* Display Products with Remove Button */}
          {products.length > 0 && (
            <div className={styles.product_list}>
              <h3>Added Products:</h3>
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    {product.title}
                    <button
                      className={styles.remove_product_btn}
                      onClick={() => handleRemoveProduct(product)}
                    >
                      Cut
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Create Room Button */}
          <div className={styles.submit_btn_container}>
            <button type="submit" className={styles.submit_btn} disabled={loading}>
              {loading ? "Creating Room..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuctionRoom;
