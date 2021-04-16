const db = require('./database');
const roles = require('./roles')
const productAndCollection = require('./product-and-collections')
const user = require('./user');
	
exports.user = () => {
    let collection = db.collection('user');
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
            productAndCollection.createCollections()
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
            productAndCollection.createProducts()
        })
        .catch(err => {
            console.log(err)
        })
}

exports.userCollection = () => {
    let collection = db.collection('userCollection');
    collection
        .create()
        .then(() => {
            console.log('user collection created.')
        })
        .catch(err => {
            console.log(err)
        })
}
