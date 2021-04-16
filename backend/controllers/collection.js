const db = require('../database/database');
let userCollection = db.collection('userCollection');


exports.createCollection = (req,res,next) => {
    console.log(req.body)

    let collection = {
        _key: 'user1-' + req.body.key,
        user: 'user/user1',
        product: 'products/' + req.body.key
    };


    userCollection.save(collection).then(
        meta =>  {
            console.log('Document saved:', meta._rev)
            res.status(200).send({msg: 'added to collection'})
        },
        err => {
            console.error('Failed to save document:', err)
            res.status(500).send({msg: 'error in adding product in a collection'})
        }
    );

}


exports.getUserCollection =  (req,res, next ) => {
    db.query('FOR uc IN userCollection FILTER uc.user == "user/user1"   RETURN uc' )
    .then(cursor => cursor.all())
    .then((data) => {
        console.log(data)
        
        res.status(200).send({data: data, msg: 'products fetched successfully'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({msg: 'Error in fetching products'})
    })         
}