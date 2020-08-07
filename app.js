var express = require('express');
var app = express();
var serv = require('http').Server(app);
var mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database:'orion',
    password: '7M8Eh56d'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database");
});


star_systems = {};
let stars = "SELECT * FROM stars";
let stars_querry = con.query(stars, (err, results) => {
    if(err) throw err;
    for (i in results) {
        
        star_systems[i] = [results[i].idPlanets, 
        results[i].Star_name, 
        results[i].Star_type,
        results[i].Star_x,
        results[i].Star_y];
    }
})

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
    console.log('socket connected');

    socket.id = Math.random();
    socket.x = 250;
    socket.y = 250;
    SOCKET_LIST[socket.id] = socket;


});

setInterval(function() {
    for(var i in SOCKET_LIST){
      var socket = SOCKET_LIST[i]

      
      socket.emit('newPosition', {
          x:socket.x,
          y:socket.y
      })

      socket.emit('render_map', {
        star_systems
    })
    }
}, 100/25)

