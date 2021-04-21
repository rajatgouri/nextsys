const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/' + process.env.NODE_ENV);
const db = require('../database/database');
const User = db.collection('user');
const passport = require('passport');

exports.signup = async(req,res,next) => {
    const  {firstName,lastName, email, password} = req.body;
     
    try {

        console.log(req.body)

        bcryptPassword = await bcrypt.hash(password, 10);

        let user = {
            "name": {
                "firstName": firstName,
                "lastName": lastName,
                
            },
            "email": email,
            "password": bcryptPassword,
            "picture": "",
            "role":"roles/user",
            "background":""
    
        }

        db.query("FOR u IN user FILTER u.email == '"+email+"' RETURN u")
        .then(cursor => cursor.all())
            .then((data) => {
                console.log(data)
                if (data.length > 0) {
                    return res.status(403).send({msg: 'Email Already Exists'})
                }
                User.save(user)
            })
            .catch(err => {
                console.log(err)
            })



    
        .then((resp) =>{
            console.log(resp)
        })
        .catch(err => {
            console.log(err);
        })
    } catch (err) {
         console.log(err);
    }
    
   



}



exports.logout = async (req,res,next) => {

}

exports.login = async (req,res,next) => {
    passport.authenticate('local',{session: false}, async function (err, user, info) {
        if (err) {
            return next (err)
        } if (!user) {
            return res.status(500).json(info.message);
        }

        const payload = {
            username: user.firstName + ' ' + user.lastName,
            email: user.email,
        }

        const options = {
            subject: `${user.id}`,
            expiresIn: "30d"
        }

        const token = await jwt.sign(payload, config.jwt.accessToken.secretKey, options)
        res.status(200).send({msg: 'logged in', token : token})
    })(req,res,next);


    
}


exports.getUser = async (req,res,next) => {
    const {token} = req.body;

    console.log(req)
}


exports.checkToken = async (req,res,next) => {

    console.log(req)
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