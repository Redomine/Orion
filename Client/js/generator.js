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
    console.log(create_star_name());
    console.log(choose_star_type());
    console.log(choose_star_coordinats());
    console.log(choose_star_size());
}