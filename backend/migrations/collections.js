const db = require('./database');
const roles = require('./roles')
const user = require('./product-and-collections')
	
exports.user = () => {
    let collection = db.collection('user');
    collection
        .create()
        .then(() => {
            console.log('user collection created.')
        })
        .catch(err => {
            console.log(err)
        })
}


exports.roles = () => {
    let collection = db.collection('roles');
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
    let collection = db.collection('collections');
    collection
        .create()
        .then(() => {
            console.log('collections created.')
            user.createCollections()
        })
        .catch(err => {
            console.log(err)
        })
}


exports.products = () => {
    let collection = db.collection('products');
    collection
        .create()
        .then(() => {
            console.log('products created.')
            user.createProducts()
        })
        .catch(err => {
            console.log(err)
        })
}