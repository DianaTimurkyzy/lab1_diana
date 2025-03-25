const homeRouting = (method, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(`
    <html>
      <head><title>Shop – Home</title></head>
      <body>
        <h1>Home</h1>
        <nav>
          <a href="/product/add">Add product</a>
          <a href="/product/new">Newest product</a>
          <a href="/logout">Logout</a>
        </nav>
      </body>
    </html>
  `);
    response.end();
};

module.exports = { homeRouting };