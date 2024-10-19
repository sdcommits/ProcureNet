

import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const CreateAuctionRoom = () => {
  const [formData, setFormData] = useState({
    auction_Type: "",
    numberOfMembers: 2,
    registration_Number: "",
    timelimit: 1800,
    minbid_increment: 1,
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/create-room", formData);
      alert("Auction Room Created Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating auction room:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create Auction Room</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
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

        <label>
          End Time:
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.submitBtn}>
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateAuctionRoom;
