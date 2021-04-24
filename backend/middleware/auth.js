const config = require('../config/development');
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwt.accessToken.secretKey, (err, user) => {
            if (err) {
                return res.status(403).send({msg: 'forbidden'});
            }
            next();
        });
    } else {
        res.status(401).send({msg: 'unauthorized'});
    }
};

const decodeJWT = (req) => {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    var decodedValue = Buffer.from(token, 'base64').toString('ascii');
    decodedValue = decodedValue.slice(decodedValue.search("id")+5,decodedValue.search("iat")-3);
    return decodedValue;
}
module.exports = { authenticateJWT,decodeJWT }