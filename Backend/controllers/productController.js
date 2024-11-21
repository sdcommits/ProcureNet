const Product = require('../models/product.model');

// Controller function to add a product
exports.addProduct = async (req, res) => {
    try {
        const { title, description, image, category, starting_price, reserve_price, seller } = req.body;

        // Validate that required fields are present
        if (!title || !description || !image || !category || !starting_price || !seller) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Create a new product instance with data from the request body
        const product = new Product({
            title,
            description,
            image,
            category,
            starting_price,
            reserve_price: reserve_price || null, // Optional field; set to null if not provided
            seller, // No need to convert seller to ObjectId if it's not an ObjectId
        });

        // Save the product to the database
        await product.save();

        // Respond with success
        res.status(201).json({
            message: "Product added successfully",
            product, // This will return the saved product, including _id
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};
