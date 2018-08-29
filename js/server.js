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

app.use(express.static(path.join(__dirname,"/..")));

app.all('/',function(req,res){
    res.render(path.join(__dirname ,"/../index.php"));
});

app.post('/send_params', function(req, res) {
    //console.log(req.body.finalResult);        
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });   
    var user_id;
    var team_id;
    var same_team = 0;
    client.connect()
        .then(() => client.query('SELECT user_id from users order by user_id desc limit 1'))
            .then((result) => {
                client.query('SELECT team from users order by team desc limit 1')
                    .then((result) => {
                        if(result.rowCount == 0)
                            team_id = 1;
                        else{         
                            console.log(result.rows[0].team);
                            team_id = result.rows[0].team + 1;
                        }
                    })
                    .catch(e => console.error(e.stack))  
                console.log("FIRST SELECT "+result.rowCount);
                if(result.rowCount == 0)
                    user_id = 1;          
                else{
                    console.log(result.rows[0].user_id);
                    user_id = result.rows[0].user_id + 1;
                }    
                console.log("USER ID "+user_id);    
                var users = req.body.finalResult;
                var req_fields = {gender:3,college_code:6,college_name:7,name:8,phone_number:9,email:10};
                var user_size = req.body.userSize;

                if(user_size == 2){
                    var user1 = users[0];
                    var full_name1 = user1[req_fields.name].Value;
                    var email1 = user1[req_fields.email].Value;
                    var phone_number1 = user1[req_fields.phone_number].Value;
                    var gender1 = user1[req_fields.gender].Value;
                    var college_name1 = user1[req_fields.college_name].Value;
                    var college_code1 = user1[req_fields.college_code].Value;

                    var user2 = users[1];
                    var full_name2 = user2[req_fields.name].Value;
                    var email2 = user2[req_fields.email].Value;
                    var phone_number2 = user2[req_fields.phone_number].Value;
                    var gender2 = user2[req_fields.gender].Value;
                    var college_name2 = user2[req_fields.college_name].Value;
                    var college_code2 = user2[req_fields.college_code].Value;

                    console.log(full_name1 + " " + email1 + " " + phone_number1 + " " + gender1 + " " + college_name1 + " " + college_code1);    
                    console.log(full_name2 + " " + email2 + " " + phone_number2 + " " + gender2 + " " + college_name2 + " " + college_code2);    
                    
                    client.query("SELECT user_id from users where (email = $1 or email = $2)",[email1,email2])
                    .then(result => {
                        console.log("SECOND SELECT" +result.rowCount)
                        if(result.rowCount == 0){
                            client.query("INSERT INTO users(user_id,full_name,email,phone_number,gender,college_name,college_code,team) values($1,$2,$3,$4,$5,$6,$7,$8),($9,$10,$11,$12,$13,$14,$15,$16)",[user_id,full_name1,email1,phone_number1,gender1,college_name1,college_code1,team_id,user_id+1,full_name2,email2,phone_number2,gender2,college_name2,college_code2,team_id])
                            .then(result => {
                                console.log("INSERT "+result.rowCount);
                                console.log("Values " + user_id); 
                                res.end("Correct");
                            })
                            .catch(e => console.error(e.stack))
                        }
                        else{
                            res.end("Already Registered");
                        }
                    })
                    .catch(e => console.error(e.stack))   
                }
                else{
                    var user1 = users[0];
                    var full_name1 = user1[req_fields.name].Value;
                    var email1 = user1[req_fields.email].Value;
                    var phone_number1 = user1[req_fields.phone_number].Value;
                    var gender1 = user1[req_fields.gender].Value;
                    var college_name1 = user1[req_fields.college_name].Value;
                    var college_code1 = user1[req_fields.college_code].Value;

                    client.query("SELECT user_id from users where email = $1",[email1])
                    .then(result => {
                        console.log("SECOND SELECT" +result.rowCount)
                        if(result.rowCount == 0){
                            client.query("INSERT INTO users(user_id,full_name,email,phone_number,gender,college_name,college_code,team) values($1,$2,$3,$4,$5,$6,$7,$8)",[user_id,full_name1,email1,phone_number1,gender1,college_name1,college_code1,team_id])
                            .then(result => {
                                console.log("INSERT "+result.rowCount);
                                console.log("Values " + user_id); 
                                res.end("Correct");
                            })
                            .catch(e => console.error(e.stack))
                        }
                        else{
                            res.end("Already Registered");
                        }
                    })
                    .catch(e => console.error(e.stack))   
                }
            })
        .catch(() => {
             client.end();
        });
});

app.listen(port, function() {
    console.log('Our app is running on ' + port);
});