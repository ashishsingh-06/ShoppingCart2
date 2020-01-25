// require modules
const http = require('http');
const app = require('./app');


// port
const port = process.env.PORT || 5000;

// server
const server = http.createServer(app);
server.listen(5000);
console.log(`server started on port ${port}`);