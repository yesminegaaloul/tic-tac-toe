var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    game_process :[]
   
}, {collection : "game"});

module.exports = mongoose.model("game",gameSchema);
