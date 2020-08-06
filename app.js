var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});

var Player = function(id) {
    var self = {
        id:id,
        number:""+Math.floor (10 * Math.random())
    }
    
    Player.list[id] = self;
	return self;
}

Player.list = {};

Player.onConnect = function(socket){
    var player = Player(socket.id);
}

Player.onDisconnect = function(socket){
	delete Player.list[socket.id];
}

io.sockets.on('connection', function(socket){
    console.log('socket connected');

    socket.id = Math.random();
    socket.x = 250;
    socket.y = 250;
    SOCKET_LIST[socket.id] = socket;

    socket.on('signIn', function(data){
        if(data.username === '' && data.password === ''){
            Player.onConnect(socket);
            socket.emit('signInResponse', {success:true});
        } else {
            socket.emit('signInResponse', {success:false});
        }
    });

});

setInterval(function() {
    for(var i in SOCKET_LIST){
      var socket = SOCKET_LIST[i]

      
      socket.emit('newPosition', {
          x:socket.x,
          y:socket.y
      })
    }
}, 100/25)