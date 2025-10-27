const http = require('http');
const app = require('./app');
// Configuration du server
const server = http.createServer(app).listen(4100); 
