const Product = require('../models/product.model'); // Ensure the path is correct
const mongoose = require('mongoose');

// Controller function to add a product
exports.addProduct = async (req, res) => {
    try {
        // Create a new product instance with data from the request body
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            starting_price: req.body.starting_price,
            reserve_price: req.body.reserve_price,
            // seller: mongoose.Types.ObjectId(req.body.seller), // Assuming seller ID is provided
        });

        // Save the product to the database
        await product.save();

        // Respond with success
        res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};
