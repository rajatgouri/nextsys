const db = require('../database/database');
const collection = db.collection('collections');
const checkAuth = require('../middleware/auth');


exports.addCollection = (req,res,next) => {
    const id = checkAuth.decodeJWT(req);
    let newCollection = {
        ...req.body,
        userId: id,
    };
    collection.save(newCollection)
    .then((data,error)=>{
        if (error) {
            res.status(500 ).send({
                msg: "Failed to add"
            });
        } else {
            res.status(200).send({
                msg: "Collection added successfully",
                data: data,
            }); 
        }
    })    
}


exports.getUserCollection =  (req,res, next ) => {
    const username = req.query.username;
    let id;
    if (username) {
        db.query("FOR u IN user FILTER u.userName=='" + username + "'RETURN u")
        .then(cursor => cursor.all()).
        then((data,error)=>{
            if (error) {
                res.status(500 ).send({
                    msg: "Failed to fetch user"
                });
            }
            console.log(data);
            if (data.length==0) {
                res.status(200 ).send({
                    msg: "No user exists"
                }); 
                return ;
            }
            id = data[0]._id
            console.log("with username");
            db.query("FOR c IN collections FILTER c.userId=='" + id + "'RETURN c")
            .then(cursor => cursor.all()).
            then((data,error)=>{
                if (error) {
                    res.status(500 ).send({
                        msg: "Failed to fetch"
                    });
                }
                res.status(200).send({
                    msg: "User Collections on the way",
                    data: data,
                }); 
            }); 
        });        
    } else {
        id = checkAuth.decodeJWT(req);
        console.log("without")
        db.query("FOR c IN collections FILTER c.userId=='" + id + "'RETURN c")
        .then(cursor => cursor.all()).
        then((data,error)=>{
            if (error) {
                res.status(500 ).send({
                    msg: "Failed to fetch"
                });
            }
            res.status(200).send({
                msg: "User Collections on the way",
                data: data,
            }); 
        }); 
    } 
}

exports.getAdminCollection =  (req,res, next ) => {
    db.query("FOR c IN collections FILTER c.userId=='users/user1' RETURN c")
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

exports.removeCollection = (req,res,next) => {
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