var gameField = document.getElementById("ctx");
var planetDiv = document.getElementById("planetDiv");
var ctx = document.getElementById("ctx").getContext("2d");
var closePlanetsButton = document.getElementById("close-planets");
var generateGalaxyButton = document.getElementById("generate-galaxy");
var turnButton = document.getElementById("turn-button");
var socket = io();

var img = {};
img.space = new Image();
img.space.src = '/img/space.png';

ctx.font = '12px Arial';
ctx.fillStyle = "white";
var render_mode = "map";








socket.on('render_map', function(data){
    ctx.clearRect(0,0,1200,700);

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
            }
        planet_count = 0
        for (i in data.planets) {
            
            if (data.planets[i][3] === system_to_render) {
                planet_count++
                img.planet = new Image();
                img.planet.src = '/img' + '/planets' + data.planets[i][2];
                planet_x = data.planets[i][7]
                planet_y = data.planets[i][8]
                planet_name = data.planets[i][1]
                planet_rich = data.planets[i][4]
                planet_ruler = data.planets[i][6]
                radius = Math.sqrt((500 - planet_x)*(500 - planet_x) + (300 - planet_y)*(300 - planet_y))
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;
                //ctx.beginPath();
                //ctx.arc(535,335,radius,0, Math.PI*2,true);
                //ctx.stroke();

                ctx.beginPath();

                ctx.ellipse(535, 335, 100*planet_count*0.65, 100*planet_count*1.1, Math.PI / 2, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.drawImage(img.planet, planet_x-35, planet_y-35)
                
                ctx.fillText(planet_name, planet_x - 40, planet_y+30);
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
        console.log(cx);
        console.log(cy);
        for (i in data.star_systems){
            star_x = data.star_systems[i][3]
            star_y = data.star_systems[i][4]
            star_id = data.star_systems[i][0]
            
            star_name = data.star_systems[i][0];
            if ((cx <= star_x + 20 && cx >= star_x - 20) && (cy <= star_y + 20 && cy >= star_y -20)){
                
                if (render_mode === "map") {
                    render_mode = "star_system";
                    generateGalaxyButton.style.display = 'none';
                    closePlanetsButton.style.display = 'inline-block';
                    system_to_render = star_id
                }
            }
        }
    }
});

