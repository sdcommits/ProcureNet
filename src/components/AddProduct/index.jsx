import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Import jwt-decode to decode the JWT

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "Electronics",
    starting_price: "",
    reserve_price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({ ...prev, image: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const maxSizeInMB = 5; // Set maximum size, e.g., 5 MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
    if (file) {
      if (file.size > maxSizeInBytes) {
        alert(`File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Please log in first.");
        navigate("/login");
        return;
      }

      // Decode the JWT token to extract the userId
      const decoded = jwt_decode(token);
      const userId = decoded.userId; // Ensure this is the correct field in your token

      // Include the userId in the formData
      const productData = { ...formData, seller: userId };

      // Debug log to check productData
      console.log("Product data to be stored:", productData);

      // Retrieve current products from localStorage
      const currentProducts = JSON.parse(localStorage.getItem("products")) || [];
      console.log("Current products in localStorage:", currentProducts);

      // Update localStorage with the new product
      const updatedProducts = [...currentProducts, productData];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Confirm storage operation
      console.log("Updated products in localStorage:", JSON.parse(localStorage.getItem("products")));

      // Optionally, send the product data to the backend
      const response = await axios.post("http://localhost:8080/api/add-product", productData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Server response:", response.data);
      alert("Product added successfully!");

      // Navigate to the live room creation page
      navigate("/create-room");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("There was an issue adding the product. Please try again.");
    }
  };

  return (
    <div className={styles.add_product_container}>
      <h1 className={styles.header}>Add Product</h1>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.image_upload_container}>
          <div className={styles.image_preview}>
            {formData.image ? (
              <img
                src={formData.image}
                alt="Product Preview"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              "No Image Selected"
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.upload_btn}
          />
        </div>
        <div className={styles.input_fields_container}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Art">Art</option>
            <option value="Collectibles">Collectibles</option>
            <option value="Fashion">Fashion</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="starting_price"
            placeholder="Starting Price"
            value={formData.starting_price}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="number"
            name="reserve_price"
            placeholder="Reserve Price (Optional)"
            value={formData.reserve_price}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.submit_btn}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

