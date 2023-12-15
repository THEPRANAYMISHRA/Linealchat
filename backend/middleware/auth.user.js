const jwt = require('jsonwebtoken');

const userAuthMiddleware = async (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).send({ "msg": "user token is not present" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.body.email = decoded.email;
        next();
    } catch (error) {
        return res.status(400).send({ "msg": "Error while parsing the token" })
    }

};

module.exports = { userAuthMiddleware };
