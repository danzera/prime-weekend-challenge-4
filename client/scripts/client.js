$(document).ready(function() {
  initialize(); // establish initial user experience
});

// initial page setup
function initialize() {
  getAllListings();
  // add event listeners to the page
  addEventListeners();
}

// any event listeners needed
function addEventListeners() {
  // HARD MODE -- need some type of listeners for property addition
}

// DOM stuff
function displayListings(listingsArray) {
  for (var i = 0; i < listingsArray.length; i++) {
    var $target = listingsArray[i].cost ? ($('#for-sale')) : ($('#for-rent'));
    console.log($target);
    $target.append(listingsArray[i]);
  }
}

// AJAX
// retrieve all property listings from the DB
function getAllListings() {
  $.ajax({
    type: 'GET',
    url: '/listings',
    success: function(res) {
      displayListings(res);
    }
  });
}
