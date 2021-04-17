const db = require('../database/database');
let userCollection = db.collection('userCollection');


exports.createCollection = (req,res,next) => {
    console.log(req.body)

    

    db.query('FOR p IN products FILTER p._key == "'+ req.body.key +'" RETURN p ')
    .then(cursor => cursor.all())
    .then((data) => {
        console.log(data)


        if(data.length < 1) {
            return res.status(400).send({msg: 'not found'})
        }
        

        let collection = {
            _key: 'user1-' + req.body.key,
            user: 'user/user1',
            product: data[0]
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
    

        // res.status(200).send({data: data, msg: 'products fetched successfully'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({msg: 'Error in fetching products'})
    })   

    


    
}


exports.getUserCollection =  (req,res, next ) => {
    db.query('FOR uc IN userCollection FILTER uc.user == "user/user1"   RETURN uc' )
    .then(cursor => cursor.all())
    .then((data) => {
        console.log(data)
        
        res.status(200).send({data: data, msg: 'collection fetched successfully'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({msg: 'Error in fetching collection'})
    })         
}