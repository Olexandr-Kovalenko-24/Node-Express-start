const express = require('express');
const app = express();
const http = require('http');

const PORT = 3000;

const server = http.createServer(app);


app.get('/', (req, res, next) => {
    console.log('first');
    next();
}, (req, res, next) => {
    console.log('second');
    next()
}, (req, res, next) => {
    console.log('fhird');
    res.send('Result');
});



server.listen(PORT, ()=>{
    console.log(`App is started on port ${PORT}`)
});