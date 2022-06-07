const fs = require('fs');
const path = require('path');

module.exports = class Products {
    static getAll() {
        const pathFile = path.join(__dirname, '../Database/products.json');
        const rawdata = fs.readFileSync(pathFile, 'utf-8');
        return  JSON.parse(rawdata).data;
    };
}
