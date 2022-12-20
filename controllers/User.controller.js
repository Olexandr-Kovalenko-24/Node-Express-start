const User = require('../models/User');

module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const createUser = await new User(body);
        const result = await createUser.save();
        res.status(201).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        next(error)
    }
}

module.exports.getOneUsers = async (req, res, next) => {
    try {
        const { userInstance, params: { userId } } = req;
        res.send(userInstance);
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { userInstance, body, params: { userId } } = req;
        const updatedUser = await userInstance.update(body);
        res.status(200).send(updatedUser);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const { userInstance, params: { userId } } = req;
        const result = await userInstance.delete();
        res.status(200).send('user deleted');
    } catch (error) {
        next(error)
    }
}

module.exports.authoriseUser = async (req, res, next) => {
    try {
        const { userInstance, body, params: { userId } } = req;
        if(userInstance.email === body.email){
            if(userInstance.password === body.password){
                res.status(202).send('Authorised.successfully');
            } else {
                res.status(400).send('Password incorrect')
            }
        } else {
            res.status(403).send('Incorrect email')
        }

    } catch (error) {
        next(error);
    }
}
