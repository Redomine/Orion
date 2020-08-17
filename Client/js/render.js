var gameField = document.getElementById("ctx");
var planetDiv = document.getElementById("planetDiv");
var ctx = document.getElementById("ctx").getContext("2d");
var closePlanetsButton = document.getElementById("close-planets");
var generateGalaxyButton = document.getElementById("generate-galaxy");
var socket = io();

var img = {};
img.space = new Image();
img.space.src = '/img/space.png';

ctx.font = '12px Arial';
ctx.fillStyle = "white";
var render_mode = "map";
socket.on('render_map', function(data){
    ctx.clearRect(0,0,800,800);

    if (render_mode === "map") {
        ctx.drawImage(img.space,0,0);
        for (i in data.star_systems) {
            img.star = new Image();
            img.star.src = '/img' + '/stars' + data.star_systems[i][2];	
            star_size = data.star_systems[i][5];
            star_x = data.star_systems[i][3];
            star_y = data.star_systems[i][4];
            star_name = data.star_systems[i][1];
            ctx.drawImage(img.star,star_x - star_size,star_y - star_size, star_size, star_size);	
            ctx.fillText(star_name, star_x - star_size,star_y+30 - star_size);
        }
    }

    if (render_mode === "star_system") {
        ctx.drawImage(img.space,0,0);
        for (i in data.star_systems) {
            if (data.star_systems[i][0] === system_to_render) {
                img.star = new Image();
                img.star.src = '/img' + '/close_stars' + data.star_systems[i][2];	
                ctx.drawImage(img.star,500,300);
                console.log(img.star.src);
            }
        for (i in data.planets) {
            if (data.planets[i][3] === system_to_render) {
                img.planet = new Image();
                img.planet.src = '/img' + '/planets' + data.planets[i][2];
                ctx.drawImage(img.planet, data.planets[i][7], data.planets[i][8])
            }
        }
        };
        
    }

})

closePlanetsButton.onclick = function(){
    render_mode = "map";
    closePlanetsButton.style.display = 'none';
    generateGalaxyButton.style.display = 'inline-block';
}

socket.on('get_star_name', function(data){
    gameField.addEventListener('mousedown' ,onDown, false);
    function onDown(event) {
        cx = event.pageX;
        cy = event.pageY;
        for (i in data.star_systems){
            star_x = data.star_systems[i][3]
            star_y = data.star_systems[i][4]
            star_id = data.star_systems[i][0]
            
            star_name = data.star_systems[i][0];
            if ((cx <= star_x + 20 && cx >= star_x - 20) && (cy <= star_y + 20 && cy >= star_y -20)){
                
                render_mode = "star_system";
                generateGalaxyButton.style.display = 'none';
                closePlanetsButton.style.display = 'inline-block';
                system_to_render = star_id
            }
        }
    }
});

