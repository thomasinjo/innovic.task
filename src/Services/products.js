const fs = require('fs');
const path = require('path');
const generatePath = () => path.join(__dirname, '../Database/products.json');
const database = {
    save(allProducts) {
        const pathFile = generatePath();
        fs.writeFileSync(pathFile, JSON.stringify({data: allProducts}, null, "\t"));
        return allProducts;
    },
    read() {
        const pathFile = generatePath();
        const rawdata = fs.readFileSync(pathFile, 'utf-8');
        return JSON.parse(rawdata).data;
    }

}

module.exports = class Products {
    static getAll() {
        return database.read();
    };

    static getById(id) {
        return database.read().find((item) => item.id === id);
    }

    static createProduct(productData) {
        const allProducts = Products.getAll();
        const alreadyExist = allProducts
            .some((product) => productData.productName === product.productName);
        if (alreadyExist) {
            throw new Error("Product with this name already exists");
        }
        productData.id = Math.floor(1000 + Math.random() * 9000);
        productData.SKU = "TK" + productData.id;
        productData.price = `${productData.price}`;

        allProducts.push(productData);
        database.save(allProducts);
        // write new product to database
        return productData;
    }

    static updateProduct(itemId, productData) {
        const someProduct = Products.getById(itemId);
        const allProducts = Products.getAll();

        if (!someProduct) {
            throw  new Error("Product with requested ID does not exist in database");
        }

        const newProductData = {
            ...someProduct,
            ...productData,
        }

            const products = allProducts.map(product => {
            if (product.id === newProductData.id) {
                return newProductData;
            }
            return product;
        })
        database.save(products);
        // update existing product to database
        return newProductData;

    }
}
