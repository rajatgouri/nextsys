const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();

dotenv.config();

var route = require('./routes/router.js');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}))

const db = require('./database/database')
// console.log(db)

let config = require('./config/'+ process.env.NODE_ENV );
const PORT = process.env.PORT || 9641;


require('./passport-config');
// Routes
app.use('/', route.init());
app.use('/images', express.static(path.join('assets/images')));


app.listen(PORT, () => {
    console.log('Connected to Server at port 9641 ... ')   
})



