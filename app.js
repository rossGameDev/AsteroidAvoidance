var express = require("express");
const mongoose = require("mongoose");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var port = process.env.port || 5000;



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/', {
    useNewUrlParser:true,useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to MongoDB")
})

require("./models/Game");
var Game = mongoose.model("game");

//app.post("/swap", function(req,res){
    //res.redirect("highscores.html")
//});

//app.get('/', function(req, res){
//    res.sendFile(__dirname+"/index.html");
//})

app.get("/", function(req,res){
    res.redirect("highscores.html");
});

app.post("/swap", function(req,res){
    res.redirect("highscores.html")
});

app.post("/saveScore", function(req, res){
    console.log(req.body);
    new Game(req.body).save().then(function(){
        res.redirect("highscores.html");
    });
});
app.post("/deleteGame", function(req, res){
    console.log(`Game Deleted! ${req.body.game}`)
    Game.findByIdAndDelete(req.body.game).exec();
    res.redirect('gameList.html');
});

app.get("/HighScores", function(req, res){
    Game.find({}).then(function(game){
        //console.log({game});
        res.json({game});
    });
});

app.use(express.static(__dirname+"/AsteroidAvoidance"));

app.listen(port, function(){
    console.log(`Running on Port ${port}`);
});