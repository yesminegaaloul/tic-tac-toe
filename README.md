# TIC-TAC-TOE

It's a web application for a multiplayer Tic Tac Toe game.

## Technologies

* NodeJs and ExpressJs
* Socket.io: A library that enables real-time communication between the browser and the server.
* Mongodb : NoSQL database

## Requirements

Install the npm packages described in the package.json and verify that it works:

"npm install"

## Usage

In the console run the command : "node ./bin/www" . Navigate to http://localhost:3000/game.

1) You need internet connection to play.
2) If you want to play on two different computers you have to change socket connection with your 
local IPaddress(var socket = io.connect("http://127.0.0.1:8080")), in the Socket.html line 19 or you can open it with private navigation.

3) Once you are connected, the server will wait for another connection to open the game,as described in the step two.

4) After playing the data will be saved only if one of the users is disconnected.
5) I persisted each player entry in the database with the following attributes:
6) Game-process: represents every game players played with: <br>
                  x,y : the cell chosen by the player
                  username
                  action : there are three types of actions : 
   - 1-Enter : the two players connected 
   - 2-User playing 
   - 3-User won
   <br>
Here is an exemple of one game played(if these two users played more games they will be saved all together):
<br>
{ "_id" : ObjectId("5bde0075e8f8523358e992fb"), "game_process" :  
[ [ { "action" : "\"enter\"", "username" : "\"ok\"" }, 
{ "action" : "\"enter\"", "username" : "\"lo\"" }, 
{ "x" : "157", "y" : "21", "action" : "\"draw\"", "username" : "\"lo\"" },
{ "x" : "157", "y" : "146", "action" : "\"draw\"", "username" : "\"lo\"" },
{ "x" : "164", "y" : "239", "action" : "\"draw\"", "username" : "\"lo\"" },
{ "x" : "164", "y" : "239", "action" : "\"WIN\"", "username" : "\"lo\"" } ] ], "__v" : 0 }
    




