var generateGalaxyButton = document.getElementById("generate-galaxy");


function create_star_name(){
    var letter = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V",
    "W", "X", "Y", "Z"]
  
    return letter[Math.floor(Math.random()*(letter.length-1))]
    +letter[Math.floor(Math.random()*(letter.length-1))]
    +letter[Math.floor(Math.random()*(letter.length-1))]
    +"-"
    +[Math.floor(Math.random() * (10 - 0)) + 0]
    +[Math.floor(Math.random() * (10 - 0)) + 0]
    +letter[Math.floor(Math.random()*(letter.length-1))]
    ;
  }

  generateGalaxyButton.onclick = function(){
    console.log(create_star_name());
}

function choose_star_type(){
    var letter = ["/red_star.png", "/blue_star.png", "/orange_star.png", "/red_star.png", "/white_star.png"]
    return letter[Math.floor(Math.random()*(letter.length-1))]
    ;
}

function choose_planet_type(){
    var letter = ["/terran.png", "/barren.png", "/gas_giant.png"]
    return letter[Math.floor(Math.random()*(letter.length-1))]
    ;
}

function choose_planet_size(){
    var letter = ["Small", "Medium", "Huge"]
    return letter[Math.floor(Math.random()*(letter.length-1))]
    ;
}

function choose_planet_rich(){
    var letter = ["Ultra_Poor", "Poor", "Abundant", "Rich", "Ultra_Rich"]
    return letter[Math.floor(Math.random()*(letter.length-1))]
    ;
}

function choose_planet_gravity(){
    var letter = ["Low", "Normal", "High"]
    return letter[Math.floor(Math.random()*(letter.length-1))]
    ;
}


function choose_star_coordinats(){
    return [[Math.floor(Math.random() * (1150 - 50)) + 50], [Math.floor(Math.random() * (650 - 50)) + 50]]
    ;
}

function choose_planet_coordinats(data){
    if (data == 1) {
        var letter = [[550, 280], [620, 300], [650, 340], [610, 400], [550, 410], [450, 310], [470, 390], [430, 340]]
    } 

    if (data == 2) {
        var letter = [[550, 210], [670, 240], [765, 330], [680, 440], [550, 475], [400, 440], [320, 340], [400, 240]]
    }

    if (data == 3) {
        var letter = [[550, 150], [690, 170], [860, 290], [745, 500], [600, 530], [265, 450], [220, 305], [350, 190]]
    }

    if (data == 4) {
        var letter = [[550, 85], [780, 125], [975, 390], [800, 560], [460, 600], [200, 510], [120, 410], [130, 250]]
    }

    return letter[Math.floor(Math.random()*(letter.length))]
    ;
}

function choose_star_size(){
    var letter = ["15", "20", "25"]
    return letter[Math.floor(Math.random()*(letter.length-1))]
    ;
}

generateGalaxyButton.onclick = function(){
    let star_id = 0;
    socket.emit('clear_galaxy');
    while (star_id < 21) {
        let new_star_name = create_star_name()
        let new_star_type = choose_star_type()
        let new_star_coorinats = choose_star_coordinats()
        let new_star_size = choose_star_size()

        let planet_star_id = star_id + 1
        let number_of_planets = (Math.floor(Math.random() * (5 - 0)) + 0)
        let count = 0
        let planet_count = 1
        let new_planet_system = []
        while(count < number_of_planets) {
            if (number_of_planets > 0) {
                let new_planet_type = choose_planet_type()
                let new_planet_size = choose_planet_size()
                let new_planet_rich = choose_planet_rich()
                let new_planet_gravity = choose_planet_gravity()
                let new_planet_coorinats = choose_planet_coordinats(planet_count)

                let new_planet_x = new_planet_coorinats[0]
                let new_planet_y = new_planet_coorinats[1]
                new_planet_system[count] = [ 
                new_star_name + '-' + planet_count, 
                new_planet_type, 
                planet_star_id,
                new_planet_size, 
                new_planet_rich, 
                new_planet_gravity,
                new_planet_x,
                new_planet_y
                ] 
            }
            planet_count++;
            count++;
        }
        socket.emit('new_game',{
            star_name:(new_star_name),
            star_type:(new_star_type),
            star_coordinats:(new_star_coorinats),
            star_size:(new_star_size),
            planet_system:(new_planet_system)
        });

        star_id++;
        new_planet_system = [];
        planet_count = 1;
        }
    }