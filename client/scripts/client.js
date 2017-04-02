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
    var property = listingsArray[i];
    if (property.cost) { // cost is defined --> sale property
      displaySaleProperty(property);
    } else { // cost undefined -->
      displayRentalProperty(property);
    }
  } // end for-loop
} // end displayListings()

function displaySaleProperty(property) {
  var city = property.city;
  var sqft = property.sqft;
  var cost = toUSD(property.cost);
  $('#for-sale').append('<div class="col-md-4"><table class="table">');
  var $table = $('#for-sale').children().last().children().last();
  $table.append('<thead><tr><th><div><span class="glyphicon glyphicon-home" aria-hidden="true"></span></div></th><th>Property Details</th>');
  $table.append('<tbody>');
  $table.children().last().append('<tr><td class="text-right">Location:</td><td>' + city + '</td>');
  $table.children().last().append('<tr><td class="text-right">Space:</td><td>' + sqft + ' sq ft</td>');
  $table.children().last().append('<tr><td class="text-right">Cost:</td><td>' + cost + '</td>');
} // end displaySaleProperty()

function displayRentalProperty(property) {
  var city = property.city;
  var sqft = property.sqft;
  var monthlyRent = parseInt(property.rent / 12);
  console.log(city + ':', monthlyRent);
  var rent = toUSD(monthlyRent);
  $('#for-rent').append('<div class="col-md-4"><table class="table">');
  var $table = $('#for-rent').children().last().children().last();
  $table.append('<thead><tr><th><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></th><th>Property Details</th>');
  $table.append('<tbody>');
  $table.children().last().append('<tr><td class="text-right">Location:</td><td>' + city + '</td>');
  $table.children().last().append('<tr><td class="text-right">Space:</td><td>' + sqft + ' sq ft</td>');
  $table.children().last().append('<tr><td class="text-right">Rent:</td><td>' + rent + ' per mo.</td>');
} // end displayRentalProperty()

// MODULE MADNESS! talk about some DRY code...
function toUSD(someNumber) {
  var numString = someNumber.toString();
  var usd = '$';

  if (numString.length < 4) {
    usd += numString;
  } else if (numString.length < 7) {
    usd += numString.substring(0, numString.length - 3) + ',' +
           numString.substring(numString.length - 3);
  } else if (numString.length < 10 ){
    usd += numString.substring(0, numString.length - 6) + ',' +
           numString.substring(numString.length - 6, numString.length - 3) + ',' +
           numString.substring(numString.length - 3);
  }
  return usd;
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
