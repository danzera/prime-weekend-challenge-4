var express = require('express'); // import express
var router = express.Router(); // create a router instance
var path = require('path'); // import path -- used for serving up index.html file

// base URL 'GET' request
router.get('/', function(req, res) {
  // send index.html file back to the client
  res.sendFile(path.resolve('server/public/views/index.html'));
});

// export our router, to be used in app.js
module.exports = router;
