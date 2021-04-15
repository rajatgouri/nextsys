const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/' + process.env.NODE_ENV);
const db = require('../database/database');

exports.signup = async(req,res,next) => {
    const  {name , email, password, type} = req.body;


}



exports.logout = async (req,res,next) => {

}

exports.login = async (req,res,next) => {

    const {email, password} = req.body;

    
}


exports.token = async (req,res,next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).send({msg: 'unauthorized'});
    }

    tokenExists = await Token.findOne({refreshToken: token})

    if( !tokenExists) {
        return res.status(403).send({msg: 'forbidden'});
    }

    jwt.verify(token, config.jwt.refreshToken.secretKey, (err, user) => {
        if (err) {
            return res.status(403).send({msg: 'forbidden'});
        }

        const accessToken = jwt.sign({ username: user.email }, config.jwt.accessToken.secretKey, { expiresIn: '7d' });

        res.json({
            accessToken
        });
    });
}