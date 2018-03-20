const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

module.exports = function(app) {
    app.get('/api/developers', (req, res) => {
        // need to return JSON file from friends js
        res.sendFile(path.join(__dirname + '/../public/Views/survey.html'));
    })
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/Views/home.html'))
    })  
    
}