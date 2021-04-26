const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/' + process.env.NODE_ENV);
const db = require('../database/database');
const User = db.collection('user');
const passport = require('passport');
const checkAuth = require('../middleware/auth');
const mime = require('mime');
const fs = require('fs');

exports.signup = async(req,res,next) => {
    const  {firstName,lastName, email, password, userName} = req.body;
     
    try {

        if(!firstName || !lastName || !email || !password || !userName) {
                return res.status(403).send({msg: 'wrong data'})
                
        }

        bcryptPassword = await bcrypt.hash(password, 10);

        let user = {
            "name": {
                "firstName": firstName,
                "lastName": lastName,    
            },
            "userName" : userName,
            "email": email,
            "password": bcryptPassword,
            "picture": "images/img_avatar.png",
            "role":"roles/user",
            "background":"images/background-default.jpg"
        }

        db.query("FOR u IN user FILTER u.email == '"+email+"' RETURN u")
        .then(cursor => cursor.all())
        .then((data) => {
            if (data.length > 0) {
                return res.status(403).send({msg: 'Email Already Exists'})
            }
            
            User.save(user)
            .then((data) => {
                return res.status(200).send({msg: 'signup successfully'})
            })
            .catch(err => {
                return res.status(500).send({msg: err})
            })

        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({msg: err})
        })
            
    } catch (err) {
         console.log(err);
         return res.status(500).send({msg: err})
    }
}

exports.login = async (req,res,next) => {
    passport.authenticate('local',{session: false}, async function (err, user, info) {
        if (err) {
            return next (err)
        } if (!user) {
            return res.status(500).json(info.message);
        }

        const payload = {
            username: user.userName,
            email: user.email,
            id : user._id,
            picture: user.picture,
            background: user.background,
        }

        const options = {
            subject: `${user.id}`,
            expiresIn: "30d"
        }

        const token = await jwt.sign(payload, config.jwt.accessToken.secretKey, options)
        res.status(200).send({msg: 'logged in', token : token})
    })(req,res,next);  
}

exports.checkUsername = async (req,res,next) => {
    const userName = req.query.userName;
    db.query("FOR u IN user FILTER u.userName == '"+ userName +"' RETURN u")
    .then(cursor => cursor.all())
    .then((data) => {
        console.log(data);
        if (data.length > 0) {
            return res.status(200).send('false');
        } else {
            return res.status(200).send('true');
        }
    })
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

exports.uploadProfile = (req,res,next) => {
    const id = checkAuth.decodeJWT(req);
    db.query("FOR u IN user FILTER u._id == '"+ id +"' RETURN u")
    .then(cursor => cursor.all())
    .then((data) => {
        console.log(data);
        if (data.length > 0) {
            var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
                response = {}; 
            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }  
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = data[0].userName+ '.' + extension;
            try {
                fs.writeFileSync("./assets/images/" + fileName, imageBuffer, 'utf8');
                let updatedUser = {
                    ...data[0],
                    picture : "images/" +  fileName
                }
                User.update(updatedUser._key, updatedUser)
                .then((data2,error)=>{
                    if (error) {
                        res.status(500 ).send({
                            msg: "Failed to update"
                        });
                    }
                    console.log(data2);
                    res.status(200).send({
                        msg: "Product Added succesfully",
                        data: data2,
                    }); 
                });
            } catch (e) {
                console.log(e);
                next(e);
            }
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({msg: err})
    })    
}

exports.uploadBackground = (req,res,next) => {
    const id = checkAuth.decodeJWT(req);
    console.log(id);
    db.query("FOR u IN user FILTER u._id == '"+ id +"' RETURN u")
    .then(cursor => cursor.all())
    .then((data) => {
        if (data.length > 0) {
            var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
                response = {};
            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }  
            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');
            let decodedImg = response;
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.extension(type);
            let fileName = data[0].userName+ '-background.' + extension;
            try {
                fs.writeFileSync("./assets/images/" + fileName, imageBuffer, 'utf8');
                let updatedUser = {
                    ...data[0],
                    background : "images/" +  fileName
                }
                User.update(updatedUser._key, updatedUser)
                .then((data2,error)=>{
                    if (error) {
                        res.status(500 ).send({
                            msg: "Failed to update"
                        });
                    }
                    console.log(data2);
                    res.status(200).send({
                        msg: "Product Added succesfully",
                        data: data2,
                    }); 
                });
            } catch (e) {
                console.log(e);
                next(e);
            }
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({msg: err})
    })    
}

exports.getImages = async (req,res,next) => {
    const userName = req.query.userName;
    db.query("FOR u IN user FILTER u.userName == '"+ userName +"' RETURN u")
    .then(cursor => cursor.all())
    .then((data) => {
        if (data.length > 0) {
            return res.status(200).send({
                data: {
                    picture: data[0].picture,
                    background: data[0].background
                }
            });
        } else {
            return res.status(500).send({
                message: "Not found"
            });
        }
    })
}