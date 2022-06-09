const fs = require('fs');
const path = require('path');
const generatePath = () => path.join(__dirname, '../Database/products.json');

module.exports = class Products {
    static getAll() {
        const pathFile = path.join(__dirname, '../Database/products.json');
        const rawdata = fs.readFileSync(pathFile, 'utf-8');
        return  JSON.parse(rawdata).data;
    };

    static getById(id) {
        const pathFile = path.join(__dirname, '../Database/products.json');
        const rawdata = fs.readFileSync(pathFile, 'utf-8');
        return JSON.parse(rawdata).data.find((item) => item.id === id);
    }
    static createProduct(productData, allProducts) {

        const alreadyExist = allProducts
            .some((product) => productData.productName === product.productName);
        if (alreadyExist) {
            throw new Error("Product with this name already exists");
        }
        productData.id = Math.floor(1000 + Math.random() * 9000);
        productData.SKU = "TK" + productData.id;
        productData.price = `$${productData.price}`;

        allProducts.push(productData);
        const pathFile = generatePath();
        fs.writeFileSync(pathFile, JSON.stringify({ data: allProducts }, null, "\t"));
        // write new product to database
        return productData;
    }
}
