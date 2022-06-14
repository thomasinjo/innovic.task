const productService = require("../Services/products");

const productController = {
    createProduct(req, res, next) {
        try {
            const productData = productService.createProduct(req.body);

            return res
                .status(200)
                .json(productData);
        } catch (err) {
            return next(err);
        }
    },

    getAll(req, res, next) {
        try {
            const status = req.query.status?.toLocaleLowerCase();
            const collection = req.query.collection?.toLocaleLowerCase();
            const allProducts = productService.getAll();

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
        } catch (err) {
            return next(err);
        }
    },
    getByID(req, res, next) {
        try {
            const itemId = +req.params.id;
            const item = productService.getById(itemId);

            if (!item) {
                res.status(404);
                res.json({error: 'Item not found'})
            }
            return res.json(item);
        } catch (err) {
            return next(err);
        }
    },


    updateProduct(req, res, next) {
        try {
            const itemId = +req.params.id;
            const productData = productService.updateProduct(itemId, req.body);

            return res
                .status(200)
                .json(productData);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = productController;
