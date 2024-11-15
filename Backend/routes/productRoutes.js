const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Ensure the path is correct

// Route to add a product
router.post('/add-product', productController.addProduct);

module.exports = router;
