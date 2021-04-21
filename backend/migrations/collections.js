const db = require('./database');
const roles = require('./roles')
const user = require('./user');
	
exports.user = () => {
    let collection = db.collection('user', {
        keyOptions: { 
            type: "autoincrement", 
            allowUserKeys: false 
        } 
    });
    collection
        .create()
        .then(() => {
            console.log('user collection created.')
            user.create()
        })
        .catch(err => {
            console.log(err)
        })
}


exports.roles = () => {
    let collection = db.collection('roles', {
        keyOptions: { 
            type: "autoincrement", 
            allowUserKeys: false 
        } 
    });
    collection
        .create()
        .then(() => {
            console.log('roles collection created.')
            roles.create()  // create user role 

        })
        .catch(err => {
            console.log(err)
        })
}


exports.collections = () => {
    let collection = db.collection('collections', {
        keyOptions: { 
            type: "autoincrement", 
            allowUserKeys: false 
        } 
    });
    collection
        .create()
        .then(() => {
            console.log('collections created.')
        })
        .catch(err => {
            console.log(err)
        })
}

