$(document).ready(function() {
  initialize(); // establish initial user experience
});

// initial page setup
function initialize() {
  $.ajax({
    type: 'GET',
    url: '/listings',
    success: function(res) {
      console.log(res);
    }
  });
  // add event listeners to the page
  addEventListeners();
}

// any event listeners needed
function addEventListeners() {
  // HARD MODE -- need some type of listeners for property addition
}
