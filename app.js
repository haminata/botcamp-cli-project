const readlineSync = require('readline-sync');
const API = require('./lib/API');
const {getChoice, getMultiChoice} = require("./chooser");
const movies = API.read("movies");
const moviePrices = API.read("moviePrices");
const movieSeating = API.read("movieSeating");




function mainMenu() {
  console.log("----------------");
  console.log("---- WELCOME TO IMAX CINEMA ----");
  console.log("--------------------------------");
  console.log("--------------------------------");
  console.log("-------- ALL OUR MOVIES --------");
  console.log("--------------------------------");
  console.log("--------------------------------");

  //** Get list of all movie locations and pass into chooser and store choice

  //** Based on selected locations get list of movies
  //** Pass movies into chooser and store choice
  //** Based on the movie selected get times pass into choose and get choice
  // Ask user for number of tickets
  // list of tickets types
  // Use number of tickets to pass into getmultichoice
  // get list of seats
  // Using the number of tickets pass into multichoice to get seats as grid
  // Calculate the total and return
  //

  const movieLocations = [];
  for (const movie of movies) {
    movie.locations.forEach((location) => {

      if(!movieLocations.includes(location)){
        movieLocations.push(location);
      }
    })
  }

 const selectedLocationIndex =  getChoice(movieLocations, "movie location");
  const selectedLocation = movieLocations[selectedLocationIndex];
  const locationMovies = movies.filter((movie) => {
    return movie.locations.includes(selectedLocation);
  })
  const movieNames = locationMovies.map((movie) => {
    return movie.title;
  });

  console.log("\n ");
  const selectedMovieIndex = getChoice(movieNames, "movie");

  const selectedMovie = locationMovies[selectedMovieIndex];
  console.log("\n ");
  const selectedTimeIndex = getChoice(selectedMovie.times, "showing time");
  let availableSeats = movieSeating.rows * movieSeating.seats;

  let numberOfTickets = null;
  while(numberOfTickets === null){
    const numChoice = readlineSync.question(`Please state number of tickets (max is ${availableSeats}): `);
    const choiceAsNumber = parseInt(numChoice);

    if(choiceAsNumber && choiceAsNumber < availableSeats){
      numberOfTickets = choiceAsNumber;
    }else{
      console.log("Invalid choice of ticket count", numChoice);
    }
  }
  console.log("\n ");

  let moviePricesList = [];
  for (const moviePricesKey in moviePrices) {
    const priceValue = moviePrices[moviePricesKey];
    moviePricesList.push([moviePricesKey, priceValue]);
  }

  let moviePricesLabels = moviePricesList.map(([ticketType, ticketPrice]) => {
    return `${ticketType}: £${ticketPrice}`;
  })

  const selectedPriceIndexes = getMultiChoice(numberOfTickets, moviePricesLabels);

  const seats = [];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < movieSeating.seats ; i++) {
        for (let j = 0; j < movieSeating.rows ; j++) {
                const letter = letters.charAt(i);
                const seatId = `${letter}${j + 1}`;
                seats.push(seatId);
        }
    }
    const selectedSeats = getMultiChoice(numberOfTickets, seats, movieSeating.rows);
}

mainMenu();
