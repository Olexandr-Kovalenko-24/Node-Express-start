const express = require('express');
const app = express();
const http = require('http');

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`App is started on port ${PORT}`)
});