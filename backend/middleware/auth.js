const config = require('../config');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwt.accessToken.secretKey, (err, user) => {
            if (err) {
                return res.status(403).send({msg: 'forbidden'});
            }

            console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.status(401).send({msg: 'unauthorized'});
    }
};

module.exports = authenticateJWT