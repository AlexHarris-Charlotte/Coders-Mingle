const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const data = require('../data/developers.js')

module.exports = function(app) {
    app.post('/api/developers', (req, res) => {
        data.push(req.body);
        res.json(data);
        //
    })
    
    app.get('/api/developers', (req, res) => {
        res.json(data);
    })


}