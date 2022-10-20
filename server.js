const http = require('http');
const { getProducts } = require('./controllers/productController');

const server = http.createServer((req, res) => {
    // MOST BASIC RES
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello World</h1>');
    // res.end();

    // NORMAL
    if (req.url === '/api/products' && req.method === 'GET') {
        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.write(JSON.stringify(products));
        // res.end();
        getProducts(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'Route not found' }));
        res.end();
    }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));