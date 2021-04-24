const db = require('arangojs')();
let config = require('../config/development.js');

db.useBasicAuth(config.database.user, config.database.password);

const collections = require('./collections');


// create database /

db.createDatabase('nextSys').then(() => {
        console.log('Database created');
        collections.user();
        collections.roles();
        collections.products();
        collections.collections();
    },
    err => console.error('Failed to create database:', err)
);


// drop database // 

// db.dropDatabase('nextSys').then(() => {
//     console.log('deleted database')
// })
// .catch(err => {
//     console.log(err)
// })
