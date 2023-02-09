var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    game:{
        type:String
    }
});

mongoose.model("game", Schema);