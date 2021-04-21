const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config/' + process.env.NODE_ENV);
const db = require('./database/database')


const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.jwt.accessToken.secretKey;

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
     function(username, password, done) {
        db.query('FOR u IN user FILTER u.email == "'+username+'" RETURN u')
        .then(cursor => cursor.all())
        .then((result) => {
            if (result.length === 0) {
                return done(null, false,{message:'incorrect username'});
            }

            const user = result[0];
            bcrypt.compare(password, user.password, function (err, result) {
                if (! result) {
                    return done(null, false, {message:'incorrect password'});
                }
                return done(null, user);
            })

        })
        .catch(err => {
            console.log(err)
            return done(err);
        })
    }
))

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    db.query('FOR u IN user FILTER u._key == "'+ jwtPayload.sub+'" RETURN u')
    .then(cursor => cursor.all())
        .then((result) => {
            if (result.length === 0) {
                return done(null, false);
            }

            return done(null, result[0]);

        })
        .catch(err => {
            console.log(err)
            return done(err, false);
        })

}))