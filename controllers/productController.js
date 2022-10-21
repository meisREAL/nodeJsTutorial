const Product = require('../models/productModel');


// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(products));
        res.end();
    } catch (error) {
        console.log(error);
    }
}

// @desc Gets single Product
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'Product not found' }));
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(product));
            res.end();
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc Create a Product
// @route POST /api/products
async function createProduct(req, res) {
    try {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {

            const { title, description, price } = JSON.parse(body);

            const product = {
                title,
                description,
                price
            };

            const newProduct = await Product.create(product);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(newProduct));
        })


    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
}