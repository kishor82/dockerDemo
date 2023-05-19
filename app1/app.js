// app.js
const http = require("http");
const fetch = require('node-fetch');

const app1Server = http.createServer(async (req, res) => {
  if (req.url === '/app2') {
    try {
      // Make a request to app2
      const app2Response = await fetch('http://app2:3000/');
      const data = await app2Response.text();
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error connecting to app2');
    }
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(`${process.env.NAME}: Hello, World!`);
  }
});


const port = 3000;
app1Server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
