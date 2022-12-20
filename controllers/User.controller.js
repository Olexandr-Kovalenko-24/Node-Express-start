const User = require('../models/User');

module.exports.createUser = async (req, res, next)=>{
    const {body} = req;
    const createUser = await new User(body);
    const result = await createUser.save();
    res.status(201).send(result);
}

module.exports.getAllUsers = async (req, res, next)=>{
    const users = await User.findAll();
    res.status(200).send(users);
}

module.exports.getOneUsers = async (req, res, next) => {
    const {params: {userId}} = req;
    const foundedUser = await User.findOne(Number(userId));
    res.send(foundedUser);
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const {body, params: {userId}} = req;
        const foundedUser = await User.findOne(Number(userId));
        const updatedUser = await foundedUser.update(body);
        res.status(200).send(updatedUser);
    } catch (error) {

    }

}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const foundedUser = await User.findOne(Number(userId));
        const result = await foundedUser.delete();
        res.status(200).send('user deleted');
    } catch (error) {
        res.status(404).send(error);
    }
}
