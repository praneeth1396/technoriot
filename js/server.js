var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var phpExpress = require('php-express')({
    binPath: '.heroku/php/bin/php'
});


app.set('views', __dirname);
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var path = require("path");

const { Client } = require('pg');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname+"/public"));

app.all('/',function(req,res){
    res.render(path.join(__dirname ,"/../index.php"));
});

app.post('/send_params', function(req, res) {
    console.log(req.body.finalResult);    
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query("SELECT user_id from users;", (err, res) => {
        if (err) console.log(err);
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
    });
    var users = req.body.finalResult;
    var index = 0;
    var req_fields = {gender:3,college_code:6,college_name:7,name:8,phone_number:9,email:10};
    for(index;index<users.length;index++){
        var user = users[index];
        var full_name = user[name].Value;
        var email = user[email].Value;
        var phone_number = user[phone_number].Value;
        var gender = user[gender].Value;
        var college_name = user[college_name].Value;
        var college_code = user[college_code].Value;
        console.log(full_name + " " + email + " " + email + " " + phone_number + " " + gender + " " + college_name + " " + college_code);
    }
    //check credentials with db here
});

app.listen(port, function() {
    console.log('Our app is running on ' + port);
});