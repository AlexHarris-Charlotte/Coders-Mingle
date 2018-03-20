const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./app/routing/htmlRoutes.js')(app);





app.listen(port, () => console.log(`Listening on port ${port}`))







