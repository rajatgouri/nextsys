const db = require('arangojs')();
let config = require('../config/development.js');

db.useBasicAuth(config.database.user, config.database.password);
db.useDatabase('nextSys');

module.exports = db;