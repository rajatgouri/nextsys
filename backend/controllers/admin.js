const db = require('../database/database');
let Products = db.collection('products');
let Collections = db.collection('collections');
const mime = require('mime');
const fs = require('fs');

exports.addCollection = async (req,res,next) => {
    let newCollection = {
        ...req.body,
        userId: "user/user1",
    };
    Collections.save(newCollection)
    .then(()=>{
        return res.status(200).send({
            message: "Collections added"
        })
    })
    .catch(function(error) {
      console.error('Error adding document', error);
      return res.status(500)
    });
}

exports.editCollection = async (req,res,next) => {
    let newCollection = {
        ...req.body,
        userId: "user/user1",
    };
    db.query("FOR c IN collections FILTER c._id=='" + newCollection._id + "'RETURN c")
    .then(cursor => cursor.all()).
    then((data,error)=>{
        if (error) {
            res.status(500 ).send({
                msg: "Failed to fetch"
            });
        }
        Collections.update(data[0]._key, newCollection)
        .then((data2,error)=>{
            if (error) {
                res.status(500 ).send({
                    msg: "Failed to update"
                });
            }
            res.status(200).send({
                msg: "Collection updated succesfully",
                data: data2,
            }); 
        });
    }) 
}

exports.addProduct = async (req,res,next) => {
    var matches = req.body.img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
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
    let fileName = req.body.name + '.' + extension;
    try {
        fs.writeFileSync("./assets/images/" + fileName, imageBuffer, 'utf8');
        let product = {
            ...req.body,
            img : "images/" +  fileName
        }
        Products.save(product)
        .then((data,error)=>{
            if (error) {
                res.status(500 ).send({
                    msg: "Failed to add"
                });
            }
            console.log(data);
            res.status(200).send({
                msg: "Product Added succesfully",
                data: data,
            }); 
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.editProduct = async (req,res,next) => {
    var matches = req.body.img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
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
    let fileName = req.body.name + '.' + extension;
    try {
        fs.writeFileSync("./assets/images/" + fileName, imageBuffer, 'utf8');
        let product = {
            ...req.body,
            img : "images/" +  fileName
        }
        Products.update(product._id,product)
        .then((data,error)=>{
            if (error) {
                res.status(500 ).send({
                    msg: "Failed to add"
                });
            }
            console.log(data);
            res.status(200).send({
                msg: "Product Added succesfully",
                data: data,
            }); 
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.removeProduct = (req,res,next) => {
    const key = req.query.key;
    Products
    .remove(String(key))
    .then(()=>{
        return res.status(200).send({
            message: "Product Removed"
        })
    })
    .catch(function(error) {
      console.error('Error removing product', error);
      return res.status(500)
    });
}

exports.getUsers = (req,res,next) => {
    db.query("FOR c IN user FILTER c.role=='roles/user' RETURN c")
    .then(cursor => cursor.all()).
    then((data,error)=>{
        if (error) {
            res.status(500 ).send({
                msg: "Failed to fetch"
            });
        }
        res.status(200).send({
            msg: "User on the way",
            data: data,
        }); 
    }); 
}
