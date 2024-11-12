import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the Add Product styles module
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file); // Read the image file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/add-product", formData);
      alert("Product added successfully!");
      navigate("/create-room"); // Redirect to Create Room after adding product
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.add_product_container}>
      <h1 className={styles.header}>Add Product</h1>
      <div className={styles.form_container}>
        <div className={styles.image_upload_container}>
          <div className={styles.image_preview}>
            {formData.image ? (
              <img src={formData.image} alt="Product Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
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
      </div>
    </div>
  );
};

export default AddProduct;
