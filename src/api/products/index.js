const express = require('express');
const router = express.Router();

const productService = require("../../Services/products")

// Get all products
router.get('/', (req, res) => {
    const allProducts = productService.getAll();
    const status = req.query.status?.toLocaleLowerCase();
    const collection = req.query.collection?.toLocaleLowerCase();

    if (!status && !collection) {
        res.json(allProducts);
    }

    if (status && !collection) {
        const result = allProducts.filter((item) => item.status.toLocaleLowerCase() === status);
        res.json(result);
    }

    if (!status && collection) {
        const result = allProducts.filter((item) => item.collection.toLocaleLowerCase() === collection);
        res.json(result);
    }

    if (status && collection) {
        const result = allProducts.filter((item) => item.status.toLocaleLowerCase() === status
            && item.collection.toLocaleLowerCase() === collection);
        res.json(result);
    }
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
