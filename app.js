const express = require('express')
const cors = require('cors');
const { main: startDB } = require('./src/services/db');
require('dotenv').config({path: __dirname + '/.env'})

const username = process.env.MONGO_LOGIN;
const password = process.env.MONGO_PASS;

const app = express()
const PORT = process?.env?.PORT | 3005;

// Mongo DB conncetion
startDB(username, password);

// middlewares, CORS, body-json
app.use(cors())
app.use(express.json());

//Routes
app.use('/api/user/', require('./src/routes/user'));
app.use('/api/product/', require("./src/routes/product"))


app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port ' + PORT)
})