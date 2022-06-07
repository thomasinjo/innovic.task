const express = require('express');
const router = express.Router();
const productService = require("../../Services/products")

router.get('/', (req, res) => {
    res.json(productService.getAll());
});

module.exports = router;
