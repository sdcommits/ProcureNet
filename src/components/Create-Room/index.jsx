import React, { useState } from "react";
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

  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]); // Array to store added products
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle individual product name input change
  const handleProductChange = (e) => {
    setProductName(e.target.value);
  };

  // Add product to the list
  const handleAddProduct = () => {
    if (productName && !products.includes(productName)) { // Avoid duplicates
      setProducts([...products, productName]);
      setProductName(""); // Clear input after adding
    }
  };

  // Submit form data and products to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auction/create-room", {
        ...formData,
        products, // Include added products in the request
      });
      alert("Auction Room Created Successfully!");
      console.log(response.data);

      // Redirect to the room page if creation is successful
      const room_Id = response.data.auctionRoom.room_Id; // Adjusted to room_Id
      navigate(`/room/${room_Id}`);
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alert("Error creating room: " + error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
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
          <div className={styles.input_group}>
            {/* Auction Type */}
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

            {/* Number of Members */}
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

          <div className={styles.input_group}>
            {/* Registration Number */}
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

            {/* Time Limit */}
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

          <div className={styles.input_group}>
            {/* Minimum Bid Increment */}
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

            {/* Start Time */}
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

          <div className={styles.input_group}>
            {/* Create Password */}
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
            <label>
              Add Product:
              <input
                type="text"
                value={productName}
                onChange={handleProductChange}
                className={styles.input}
              />
            </label>
            <button type="button" className={styles.add_product_btn} onClick={handleAddProduct}>
              Add Product
            </button>
          </div>

          {/* Display Products */}
          {products.length > 0 && (
            <div className={styles.product_list}>
              <h3>Added Products:</h3>
              <ul>
                {products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Center the Create Room button */}
          <div className={styles.submit_btn_container}>
            <button type="submit" className={styles.submit_btn}>
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuctionRoom;
