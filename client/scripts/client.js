// boolean used for updating placeholder text and sending new listings to the server
var forSale = true;

$(document).ready(function() {
  initialize(); // establish initial user experience
});

// initial page setup
function initialize() {
  // get all listings from the database
  getAllListings();
  // add event listeners to the page
  addEventListeners();
}

// any event listeners needed
function addEventListeners() {
  $('.newProperty').on('click', '#saleProp', saleRadio); // for-sale radio button
  $('.newProperty').on('click', '#rentalProp', rentalRadio); // rental prop radio button
  $('.newProperty').on('submit', addNewProperty); // submit listing button


}

// clear all listing input fields
function resetInputs() {
  $('#saleProp').prop('checked', true);
  saleRadio();
  var location = $('#location').val('');
  var size = $('#size').val('');
  var price = $('#price').val('');
}

// when for-sale radio button is clicked
function saleRadio() {
  forSale = true; // update forSale varialbe to true
  $('#price').attr('placeholder','Sale Price'); // alter placeholder text for price input
}

// when rental property radio button is clicked
function rentalRadio() {
  forSale = false; // update forSale varialbe to false
  $('#price').attr('placeholder','Annualized Rent'); // alter placeholder text for price input
}

// add a new property to the database
function addNewProperty(event) {
  event.preventDefault();
  var location = $('#location').val();
  var size = $('#size').val();
  var price = $('#price').val();
  // verify input
  if (location === '' || size === '' || price === '') {
    alert('Please complete all input fields. Thank you, kindly.');
  } else {
    var property = {
      location: location,
      size: size,
      price: price,
      forSale: forSale
    };
    resetInputs();
    postProperty(property);
  }
} // end addNewProperty()

// DOM updates
// display a combination of for-sale properties and rental properties
function displayListings(listingsArray) {
  $('#for-sale').empty();
  $('#for-sale').append('<h2 class="text-center">Properties For Sale</h2><hr class="my-4">');
  $('#for-rent').empty();
  $('#for-rent').append('<h2 class="text-center">Properties For Rent</h2><hr class="my-4">');
  for (var i = 0; i < listingsArray.length; i++) {
    var property = listingsArray[i];
    if (property.cost) { // cost is defined --> sale property
      displaySaleProperty(property);
    } else { // cost undefined -->
      displayRentalProperty(property);
    }
  } // end for-loop
} // end displayListings()

// display a table with for-sale property details
function displaySaleProperty(property) {
  var city = property.city;
  var sqft = numWithCommas(property.sqft);
  var cost = numWithCommas(property.cost);
  $('#for-sale').append('<div class="col-sm-4"><table class="table table-striped"></table></div>');
  var $table = $('#for-sale').children().last().children().last();
  $table.append('<thead class="sale"><tr><th class="text-center"><div><span class="glyphicon glyphicon-home" role="button" data-toggle="modal" data-target="#myModal" aria-hidden="true"></span></div></th><th>Property Details</th>');
  $table.append('<tbody>');
  $table.children().last().append('<tr><td class="text-right">Location:</td><td>' + city + '</td>');
  $table.children().last().append('<tr><td class="text-right">Space:</td><td>' + sqft + ' sq ft</td>');
  $table.children().last().append('<tr><td class="text-right">Cost:</td><td>$' + cost + '</td>');
} // end displaySaleProperty()

// display a table with rental property details
function displayRentalProperty(property) {
  var city = property.city;
  var sqft = numWithCommas(property.sqft);
  var monthlyRent = parseInt(property.rent / 12);
  var rent = numWithCommas(monthlyRent);
  $('#for-rent').append('<div class="col-sm-4"><table class="table table-striped"></table></div>');
  var $table = $('#for-rent').children().last().children().last();
  $table.append('<thead class="rental"><tr><th class="text-center"><span class="glyphicon glyphicon-calendar" role="button" data-toggle="modal" data-target="#myModal" aria-hidden="true"></span></th><th>Rental Details</th>');
  $table.append('<tbody>');
  $table.children().last().append('<tr><td class="text-right">Location:</td><td>' + city + '</td>');
  $table.children().last().append('<tr><td class="text-right">Space:</td><td>' + sqft + ' sq ft</td>');
  $table.children().last().append('<tr><td class="text-right">Rent:</td><td>$' + rent + ' per mo.</td>');
} // end displayRentalProperty()

// MODULE MADNESS! talk about some DRY code...
function numWithCommas(someNumber) {
  var numString = someNumber.toString();
  var numCommas = '';

  if (numString.length < 4) {
    numCommas += numString;
  } else if (numString.length < 7) {
    numCommas += numString.substring(0, numString.length - 3) + ',' +
           numString.substring(numString.length - 3);
  } else if (numString.length < 10 ){
    numCommas += numString.substring(0, numString.length - 6) + ',' +
           numString.substring(numString.length - 6, numString.length - 3) + ',' +
           numString.substring(numString.length - 3);
  }
  return numCommas;
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

// send new property to the DB
function postProperty(property) {
  console.log('posting property:', property);
  $.ajax({
    type: 'POST',
    url:'/listings/new',
    data: property,
    success: function(res) {
      getAllListings();
    }
  });
}
