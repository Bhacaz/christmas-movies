const fs = require("fs");

let rawdata = fs.readFileSync("src/models/movies.json");
let movies = JSON.parse(rawdata);

function shuffleArr(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
    array[i].date = i + 1;
  }
}

shuffleArr(movies);

fs.writeFileSync("src/models/movies.json", JSON.stringify(movies, null, 2));
