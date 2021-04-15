const db = require('arangojs')();

const dotenv = require('dotenv');
dotenv.config();

let config = require('../config/' + process.env.NODE_ENV);

db.useBasicAuth(config.database.user, config.database.password)
db.useDatabase('nextSys');

module.exports = db;