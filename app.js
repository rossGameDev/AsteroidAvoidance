var express = require("express");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost:27017/HighScores", {
    useNewUrlParser:true,useUnifiedTopology:true
}, (err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Successfully connected!");
    }
});

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.listen(3000, ()=>{
    console.log("*** on port 3000 ***");
})