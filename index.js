const express = require('express');
const app = express();
const http = require('http');
const bodyParser = express.json();
const {validateUser} = require('./mw/validation.mw');
const UserController = require('./controllers/User.controller');
const {ValidationError} = require('yup');

const PORT = 3000;

const server = http.createServer(app);

app.post('/users', bodyParser, validateUser, UserController.createUser);
app.post('/users/:userId', bodyParser, UserController.authoriseUser);
app.get('/users/', UserController.getAllUsers);
app.get('/users/:userId', UserController.getOneUsers);
app.put('/users/:userId', bodyParser, UserController.updateUser);
app.delete('/users/:userId', UserController.deleteUser);

const errorHandler = async (err, req, res, next) => {
    if(err instanceof TypeError) {
        return res.status(400).send('Invalid request');
    }
    if(err instanceof ValidationError) {
        return res.status(401).send(err.message);
    }
    res.status(404).send();
}
app.use(errorHandler);

server.listen(PORT, ()=>{
    console.log(`App is started on port ${PORT}`)
});