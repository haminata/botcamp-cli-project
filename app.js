const readlineSync = require('readline-sync');
const API = require('./lib/API');

function displayMovies(){}
function displayLocations(){}
function chooseAMovieProperty(movieProperty){}



function displayCinemaProperties(cinemaProperty) {
  cinemaProperty.forEach((elementProperty, index) =>{
    console.log(`${index + 1}. ${elementProperty}`);
  });
}

function mainMenu() {
  console.log("----------------");
  console.log("---- WELCOME TO IMAX CINEMA ----");
  console.log("----------------");
  console.log("1. View our movies");
  console.log("2. List of locations");
  console.log("----------------");
  
  const choice = readlineSync.question("Please choose an option ");
  
  if (choice === "1") {
    console.log("-----------------");
    console.log("- ALL OUR MOVIES -");
    console.log("-----------------");
    
    // get all books
    const movies = API.read("movies");
    displayCinemaProperties(movies.map(element => element.title));
    
    // return to main menu
    mainMenu();
  } else if (choice === "2") {
    console.log("-----------------");
    console.log("- CHOOSE A LOCATIONS -");
    console.log("-----------------");
    
    // const cinemaLocations = API.read("locations");
    // const book = chooseABook(books);
    // displayBookDetails(book);
    
    // Input review details
    // const rating = readlineSync.question("What is your rating? ");
    // const content = readlineSync.question("Please write your review ");
    //
    // // add the new review to the book reviews
    // book.reviews.push({
    //   rating: rating,
    //   content: content
    // });
    
    // update the book in the API
    // API.update("books", book);
    //
    // console.log("----------------------------");
    // console.log("Thanks for leaving a review!");
    // console.log("----------------------------");
    
    // return to main manu
    mainMenu();
  } else {
    console.log("Sorry we didn't recognise that choice!");
    mainMenu();
  }
}

mainMenu();
