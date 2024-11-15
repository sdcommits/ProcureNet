import React, { useState } from "react";
import styles from "./styles.module.css";
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
    if (file) {
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
      const response = await axios.post("http://localhost:8080/api/add-product", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Product added successfully!");

      // Save the full product object to localStorage
      const currentProducts = JSON.parse(localStorage.getItem("products")) || [];
      localStorage.setItem("products", JSON.stringify([...currentProducts, formData]));

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
