var express = require('express');
http = require('http');
var router = express.Router();
server = http.createServer(router),
    io = require('socket.io').listen(server);
var players = [];
var path = require('path');
var Game = require('../models/Game')
var game_process = [];
var go = {};
// connection to socket
io.sockets.on('connection', function (socket) {

    socket.on('message', function (player) {


        x = JSON.stringify(player.x);
        y = JSON.stringify(player.y);
        action = JSON.stringify(player.action);
        username = JSON.stringify(player.name);
        go = { x, y, action, username }
        game_process.push(go);


        if (player.action == "enter") {

            // A new player, send data to the web.
            player.sessionId = socket.id;
            socket.json.send(player);

            // Found another waiting player.
            var found = false;

            for (var i in players) {


                var found = false;

                if (players[i].enemy == null) {

                    player.enemy = {
                        sessionId: players[i].sessionId,
                        name: players[i].name
                    }

                    players[i].enemy = {
                        sessionId: player.sessionId,
                        name: player.name
                    }

                    found = true;
                    break;
                }
            }

            // If didn't find another waiting player

            if (!found) {

                player.action = "wait";
                player.type = "O";

                socket.json.send(player);

                // Another player found.
            } else {
                // Send message by socket.

                player.action = "play"; // Let's play
                player.type = "X";

                socket.json.send(player);
                io.sockets.sockets[player.enemy.sessionId].json.send(player);
            }

            players.push(player);
        }
        else {


            socket.json.send(player);
            io.sockets.sockets[player.enemy.sessionId].json.send(player);



        }
    });
    // once one user is deconnected, we save the data in our database
    socket.on('disconnect', function (date) {

        var game = new Game({ game_process: [game_process] });
        game.save(function () {

            console.log('game saved!');
        })



    });

});




// listing port for the socket
server.listen(8080);

// rendering the view
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/Socket.html'));
})



module.exports = router;