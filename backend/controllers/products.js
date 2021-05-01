const db = require('../database/database');
let Products = db.collection('products');
let Collections = db.collection('collections');

exports.getAllProducts = async (req,res,next) => {
    db.query("FOR p IN products RETURN p")
    .then(cursor => cursor.all()).
    then((data,error)=>{
        if (error) {
            res.status(500 ).send({
                msg: "Failed to fetch"
            });
        }
        res.status(200).send({
            msg: "Admin Collections on the way",
            data: data,
        }); 
    }) 
}

exports.removeProduct = async (req,res,next) => {
    const key = req.query.key;
    collection
    .remove(String(key))
    .then(()=>{
        return res.status(200).send({
            message: "Collection Removed"
        })
    })
    .catch(function(error) {
      console.error('Error removing document', error);
      return res.status(500)
    });
}

exports.addProduct = async (req,res,next) => {
    const collectionId = req.body.collectionId;
    const productId = req.body.productId;
    db.query("FOR c IN collections FILTER c._id=='" + collectionId + "'RETURN c")
    .then(cursor => cursor.all()).
    then((data,error)=>{
        if (error) {
            res.status(500 ).send({
                msg: "Failed to fetch"
            });
        }
        let updatedCollection = {
            ...data[0]
        };
        updatedCollection.products.push(productId);
        Collections.update(updatedCollection._key, updatedCollection)
        .then((data2,error)=>{
            if (error) {
                res.status(500 ).send({
                    msg: "Failed to update"
                });
            }
            res.status(200).send({
                msg: "Product Added succesfully",
                data: data2,
            }); 
        });
    }) 
}

exports.removeProduct = async (req,res,next) => {
    const collectionId = req.query.collectionId;
    const productId = req.query.productId;
    db.query("FOR c IN collections FILTER c._id=='" + collectionId + "'RETURN c")
    .then(cursor => cursor.all()).
    then((data,error)=>{
        if (error) {
            res.status(500 ).send({
                msg: "Failed to fetch"
            });
        }
        console.log(data);
        let updatedCollection = {
            ...data[0]
        };
        updatedCollection.products=updatedCollection.products.filter(p=>p!==productId);
        Collections.update(updatedCollection._key, updatedCollection)
        .then(()=>{
            return res.status(200).send({
                message: "Collection Removed"
            })
        })
        .catch(function(error) {
          console.error('Error removing document', error);
          return res.status(500)
        });
    }) 
}


