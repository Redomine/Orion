var express = require('express');
var app = express();
var serv = require('http').Server(app);
var mysql = require('mysql');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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
        star_systems[i] = [results[i].Star_id, 
        results[i].Star_name, 
        results[i].Star_type,
        results[i].Star_x,
        results[i].Star_y,
        results[i].Star_size,
        ];
    }
})

planets = {};
let planets_data = "SELECT * FROM planets";
let planets_querry = con.query(planets_data, (err, results) => {
    if(err) throw err;
    for (i in results) {
        planets[i] = [results[i].Planet_id, 
        results[i].Planet_name, 
        results[i].Planet_type,
        results[i].Planet_star_id,
        results[i].Planet_size,
        results[i].Planet_rich,
        results[i].Planet_gravity,
        results[i].Planet_x,
        results[i].Planet_y,
        ];
    }
})

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
    console.log('socket connected');

    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    socket.emit('get_star_name', {
        star_systems
    });

    socket.on('new_game',function(data){
        console.log(data.star_name)});    
});

setInterval(function() {
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i]
        socket.emit('render_map', {
            star_systems, planets})

        }

})

