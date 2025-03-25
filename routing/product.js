const fs = require('fs');
const { STATUS_CODE } = require('../constants/statusCode');

const productRouting = (request, response) => {
    const { url, method } = request;

    if (method === 'GET' && url === '/product/add') {
        response.setHeader('Content-Type', 'text/html');
        response.write(`
      <html>
        <head><title>Shop – Add product</title></head>
        <body>
          <h1>Add product</h1>
          <form method="POST" action="/product/add">
            <input name="name" placeholder="Name" /><br>
            <input name="description" placeholder="Description" /><br>
            <button type="submit">Add</button>
          </form>
          <nav>
            <a href="/">Home</a>
            <a href="/product/new">Newest product</a>
            <a href="/logout">Logout</a>
          </nav>
        </body>
      </html>
    `);
        response.end();
    } else if (method === 'POST' && url === '/product/add') {
        const body = [];
        request.on('data', (chunk) => body.push(chunk));
        request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const formData = parsedBody.split('&').reduce((acc, entry) => {
                const [key, value] = entry.split('=');
                acc[key] = decodeURIComponent(value);
                return acc;
            }, {});
            const data = `Name: ${formData.name}, Description: ${formData.description}`;
            fs.writeFile('product.txt', data, (err) => {
                if (err) throw err;
                response.statusCode = STATUS_CODE.FOUND;
                response.setHeader('Location', '/product/new');
                response.end();
            });
        });
    } else if (method === 'GET' && url === '/product/new') {
        response.setHeader('Content-Type', 'text/html');
        fs.readFile('product.txt', 'utf-8', (err, data) => {
            response.write(`
        <html>
          <head><title>Shop – Newest product</title></head>
          <body>
            <h1>Newest product</h1>
            <div>${err || !data ? 'No new products available.' : data}</div>
            <nav>
              <a href="/">Home</a>
              <a href="/product/add">Add product</a>
              <a href="/logout">Logout</a>
            </неав>
          </body>
        </html>
      `);
            response.end();
        });
    } else {
        console.warn(`ERROR [${new Date().toUTCString()}]: requested url ${url} doesn’t exist`);
        response.statusCode = STATUS_CODE.NOT_FOUND;
        response.end();
    }
};

module.exports = { productRouting };