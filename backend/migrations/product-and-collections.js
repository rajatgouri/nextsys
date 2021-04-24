const db = require('./database');

const collection = db.collection('collections');
const products = db.collection('products');


exports.createCollections = () => {
    let collection1 = {
        _key: 'summer',
        name: 'Summer',
        userId: 'users/user1',
        products : []
    };


    let collection2 = {
        _key: 'christmas',
        name: 'Christmas',
        userId: 'users/user1',
        products : []
    };




    collection.save(collection1).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );

    collection.save(collection2).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );


}


exports.createProducts = () => {
    let productList = [{
        _key: 'product1',
        name: 'product1',
        img: 'https://images-na.ssl-images-amazon.com/images/I/717VPWr51hL._UX569_.jpg',
        price: 100,
        discount: 5,
        currency: 'USD',
        collection: 'collections/summer'
    },
    {
        _key: 'product2',
        name: 'product2',
        img: 'https://images-na.ssl-images-amazon.com/images/I/61hh8wS16wL._UX569_.jpg',
        price: 140,
        discount: 5,
        currency: 'USD',
        collection: 'collections/summer'
    },
    {
        _key: 'product3',
        name: 'product3',
        img: 'https://m.media-amazon.com/images/I/61bu+Q0SwiL._SX569._SX._UX._SY._UY_.jpg',
        price: 350,
        discount: 4,
        currency: 'USD',
        collection: 'collections/summer'
    },
    {
        _key: 'product4',
        name: 'product4',
        img: 'https://images-na.ssl-images-amazon.com/images/I/81Yqx-u2z4L._UY500_.jpg',
        price: 50,
        discount: 1,
        currency: 'USD',
        collection: 'collections/summer'
    },
     {
        _key: 'product5',
        name: 'product5',
        img: 'https://images-na.ssl-images-amazon.com/images/I/717VPWr51hL._UX569_.jpg',
        price: 200,
        discount: 5,
        currency: 'USD',
        collection: 'collections/summer'
    },
     {
        _key: 'product6',
        name: 'product6',
        img: 'https://images-na.ssl-images-amazon.com/images/I/81F3SWHhd%2BL._UX569_.jpg',
        price: 100,
        discount: 2,
        currency: 'USD',
        collection: 'collections/christmas'
    },
     {
        _key: 'product7',
        name: 'product7',
        img: 'https://m.media-amazon.com/images/I/81DtftGvPzL._SX569._SX._UX._SY._UY_.jpg',
        price: 100,
        discount: 5,
        currency: 'USD',
        collection: 'collections/christmas'
    },
    {
        _key: 'product8',
        name: 'product8',
        img: 'https://m.media-amazon.com/images/I/81vEpJyFz4L._SX569._SX._UX._SY._UY_.jpg',
        price: 100,
        discount: 5,
        currency: 'USD',
        collection: 'collections/christmas'
    }, {
        _key: 'product9',
        name: 'product9',
        img: 'https://m.media-amazon.com/images/I/81wr3PGBTYL._SX569._SX._UX._SY._UY_.jpg',
        price: 100,
        discount: 5,
        currency: 'USD',
        collection: 'collections/christmas'
    },
    {
        _key: 'product10',
        name: 'product10',
        img: 'https://m.media-amazon.com/images/I/81DtftGvPzL._SX569._SX._UX._SY._UY_.jpg',
        price: 100,
        discount: 5,
        currency: 'USD',
        collection: 'collections/christmas'
    },
    {
        _key: 'product11',
        name: 'product11',
        img: 'https://m.media-amazon.com/images/I/81KOt4lHhsL._SY741._SX._UX._SY._UY_.jpg',
        price: 250,
        discount: 10,
        currency: 'USD',
        collection: 'collections/christmas'
    }]


  


    for(let i=0; i<productList.length ; i++) {
        products.save(productList[i]).then(
            meta => console.log('Document saved:', meta._rev),
            err => console.error('Failed to save document:', err)
        );
    }


}


