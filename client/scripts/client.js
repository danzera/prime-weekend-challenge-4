$(document).ready(function() {
  // start with a basic console.log
  // TEST to ensure jQuery and our JS files are sourced into our HTML doc correctly
  console.log('Meow, meow, meow...cat speak for JS/jQ files sourced');
  // call init() function to establish base page setup
  init();
});

// initial page setup
function init() {
  // add event listeners to the page
  addEventListeners();
}

// any event listeners needed
function addEventListeners() {
  // a basic button click-listener
  // uses the sayHi() function when #helloBtn is clicked
  $('.jumbotron').on('click', '#helloBtn', sayHi);
}

// say 'hi' to the user
function sayHi() {
  alert('Well, hello there!');
}
