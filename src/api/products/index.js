const express = require('express');
const router = express.Router();
const productService = require("../../Services/products")

// Get all products
router.get('/', (req, res) => {
    res.json(productService.getAll());
});

// Get product by ID
router.get('/:id', (req, res) => {
    const itemId = +req.params.id;
    const item = productService.getById(itemId);

    if (!item) {
        res.status(404);
        res.json({ error: 'Item not found'})
    }
    res.json(item);
});

module.exports = router;
