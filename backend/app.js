const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();


const cors = require('cors')
var route = require('./routes/router.js');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
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


app.listen(PORT, () => {
    console.log('Connecting to Server at port 9641 ... ')   
})



