const express = require('express');
const router = express.Router();

const productController = require("../../controllers/productsController");
const middlewares = require("../../middlewares");


//Create New product
router.post('/', middlewares.validationForProducts, productController.createProduct);

//Update existing product needs validation
router.put('/:id', productController.updateProduct);

// Get all products & get products of some status and collection
router.get('/', productController.getAll);

// Get product by ID
router.get('/:id', productController.getByID);

module.exports = router;
