const express = require('express');
const router = express.Router();

const productService = require("../../Services/products")
const allProducts = productService.getAll();


// Get all products & get products of some status and collection
router.get('/', (req, res) => {
    const status = req.query.status?.toLocaleLowerCase();
    const collection = req.query.collection?.toLocaleLowerCase();

    if (!status && !collection) {
        return res.json(allProducts);
    }

    if (status && !collection) {
        const result = allProducts.filter((item) => item.status.toLocaleLowerCase() === status);
        return res.json(result);
    }

    if (!status && collection) {
        const result = allProducts.filter((item) => item.collection.toLocaleLowerCase() === collection);
        return res.json(result);
    }

    if (status && collection) {
        const result = allProducts.filter((item) => item.status.toLocaleLowerCase() === status
            && item.collection.toLocaleLowerCase() === collection);
        return res.json(result);
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
    return res.json(item);
});

// Create new product
const validationForProducts = (req, res, next) => {
    const body = req.body;
    const arraySeasons = ["winter", "spring", "summer", "autumn"];
    const arraySizes = ["XS", "S", "M", "L", "XL"];
    const arrayStatus = ["available", "unavailable", "pending"];

    if (!body.productName) {
        return next(new Error("Name required for product"));
    }
    if (!body.collection || !arraySeasons.includes(body.collection?.toLocaleLowerCase())) {
        return next(new Error("Collection must be one of 4 seasons"));
    }
    if (!body.sizesAvailable)  {
        return  next(new Error("Sizes are reuqired field"));
    }
    if (!body.status || !arrayStatus.includes(body.status?.toLocaleLowerCase())) {
        return  next(new  Error("Status can be available, unavailable or pending"));
    }
    if (!isNaN(String.fromCharCode(body.price))) {
        return next(new Error("Price must be number"));
    }
    return next();
}

const productController = {
    createProduct(req, res, next) {
        try {
            const productData = productService.createProduct(req.body, allProducts);

            return res
                .status(200)
                .json(productData);
        } catch (err) {
            return next(err);
        }
    }
}

router.post('/', validationForProducts, (req, res, next) => productController.createProduct(req, res, next));

module.exports = router;
