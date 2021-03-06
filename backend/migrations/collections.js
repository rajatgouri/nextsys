const db = require('./database');
const roles = require('./roles')
const user = require('./user');
const superCollections = require('./product-and-collections');
	
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
            superCollections.createCollections() // create super admin collections
        })
        .catch(err => {
            console.log(err)
        })
}

exports.products = () => {
    let products = db.collection('products', {
        keyOptions: { 
            type: "autoincrement", 
            allowUserKeys: false 
        } 
    });
    products
        .create()
        .then(() => {
            console.log('products created.')
            superCollections.createProducts() // create super admin products
        })
        .catch(err => {
            console.log(err)
        })
}

