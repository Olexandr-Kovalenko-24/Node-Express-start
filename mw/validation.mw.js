const {USER_SCHEMA} = require('../schemas/user.schema');

module.exports.validateUser = async (req, res, next)=>{
    const {body} = req;
    try {
        const result = await USER_SCHEMA.validate(body);
        next();
    } catch (error) {
        res.status(400).send(error.message)
    }
}