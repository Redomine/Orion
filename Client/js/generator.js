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

        let planet_star_id = star_id
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
                let new_planet_x = 100
                let new_planet_y = 100
                new_planet_system[count] = [planet_star_id, 
                new_star_name + '-' + planet_count, 
                new_planet_type, 
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
        console.log(new_planet_system);
        socket.emit('new_game',{
            star_name:(new_star_name),
            star_type:(new_star_type),
            star_coordinats:(new_star_coorinats),
            star_size:(new_star_size),
        });

        star_id++;
        new_planet_system = [];
        planet_count = 1;
        }
    }