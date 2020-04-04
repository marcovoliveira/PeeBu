const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path')
//const mongo = require('./database.js');

const start = async () => {
    const app = express();
    const port = 8080;
    //const db = await mongo.connect();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', express.static(path.join(__dirname, '/public')))
    app.listen(port, () => console.log(`Book Manager API listening on port ${port}`));
}

start();