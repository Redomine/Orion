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
let truncate_table_stars = "TRUNCATE TABLE stars";
let truncate_table_planets = "TRUNCATE TABLE planets";
const sql_stars = "INSERT INTO stars(`Star_name`, `Star_type`, `Star_x`, `Star_y`, `Star_size`) VALUES(?, ?, ?, ?, ?)";
const sql_planets = "INSERT INTO planets(`Planet_name`, `Planet_type`, `Planet_star_id`, `Planet_size`, `Planet_rich`, `Planet_gravity`, `Planet_x`, `Planet_y`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

io.sockets.on('connection', function(socket){
    console.log('socket connected');

    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    socket.emit('get_star_name', {
        star_systems
    });

    socket.on('clear_galaxy',function(){
        con.query(truncate_table_stars, function(err, results) {
            if(err) console.log(err);
            else console.log("Data deleted")});
        
        con.query(truncate_table_planets, function(err, results) {
            if(err) console.log(err);
            else console.log("Data deleted")});
    });

    socket.on('new_game',function(data){

        new_star = []
        new_star[0] = data.star_name
        new_star[1] = data.star_type
        new_star[2] = data.star_coordinats[0]
        new_star[3] = data.star_coordinats[1]
        new_star[4] = data.star_size
        

        con.query(sql_stars, new_star, function(err, results) {
            if(err) console.log(err);
            else console.log("Star appended")});

        
        if (data.planet_system != []) {
            //console.log(data.planet_system);
            for (planet in data.planet_system) {
                con.query(sql_planets, data.planet_system[planet], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Planet appended")});
                }
        }
        });


        

});



setInterval(function() {
    console.log(1);
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i]
        socket.emit('render_map', {
            star_systems, planets})

        }

})

