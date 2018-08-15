var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/send_params', function(req, res) {
    console.log(req.body.id)
    console.log(req.body.pass);
    console.log(req.body.email);

    //check credentials with db here
});

app.listen(3000);