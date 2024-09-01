const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
   const url = req.url;
   if (url === '/helloworld') {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'text/html'); 
        res.end('<h1>Hello world in HTML</h1>');
    } else if (url === '/homepage') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain'); 
        res.end('HOMEPAGE'); 
    } else {
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found'); 
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});