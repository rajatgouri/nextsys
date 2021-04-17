const db = require('../database/database');
let Products = db.collection('products');

exports.getProducts = async (req,res,next) => {
    db.query("FOR p IN products FOR c IN collections  FILTER p.collection == c._id RETURN { product: p, collection: c }")
        .then(cursor => cursor.all())
        .then((data) => {
            res.status(200).send({data: data, msg: 'products fetched successfully'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({msg: 'Error in fetching products'})
        })
}


exports.getProductsByCollection = async (req,res,next) => {
    db.query('FOR p IN products   FILTER p.collection == "collections/'+ req.body.key +'"  { product: p }')
        .then(cursor => cursor.all())
        .then((data) => {
            res.status(200).send({data: data, msg: 'products fetched successfully'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({msg: 'Error in fetching products'})
        })
}

