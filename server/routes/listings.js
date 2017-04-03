var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// SCHEMAS: Define HOW Documents will be saved to the Database
// this schema is strictly used for getting all listings
var PropertyListingSchema = mongoose.Schema({});
// schema for rental properties
var RentalPropertySchema = mongoose.Schema({
  rent: Number,
  sqft: Number,
  city: String,
});
// schema for for-sale properties
var SalePropertySchema = mongoose.Schema({
  cost: Number,
  sqft: Number,
  city: String
});

// MODELS
var collectionName = 'listings';
var Listings = mongoose.model('listings', PropertyListingSchema, collectionName);
var Rentals = mongoose.model('rentals', RentalPropertySchema, collectionName);
var Sales = mongoose.model('rales', SalePropertySchema, collectionName);


// GET listings
router.get("/", function(req,res){
  console.log('/listings route hit');
  // Get all listings
  Listings.find(function(err, allListings){
    if(err){
      console.log('error getting all listings:', err);
      res.sendStatus(500);
    }
    console.log('entire listings collection sent back to client');
    res.send(allListings);
  });
});

// post a new property listing
router.post("/new", function(req,res){
  //Instance of the Model to be saved to the database
  var property;
  if (req.body.forSale === 'true') {
    property = new Sales();
    property.cost = parseInt(req.body.price);
  } else {
    property = new Rentals();
    property.rent = parseInt(req.body.price);
  }
  property.city = req.body.location;
  property.sqft = req.body.size;
  property.save(function(err, savedProperty){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.send(savedProperty);
  });
});

// STRETCH GOALS
/*
  $.ajax({
      type: "DELETE",
      url: "/employees/" + id,
      success stuff
  });
  $.ajax({
      type: "DELETE",
      data: data,
      url: "/employees/",
      success stuff
  });
*/
/* UNNECESSARY MODE
//Delete an employee
router.delete("/", function(req,res){
  //Delete an employee
  // { "id" : "83275019375918538?"}
  var id = req.body.id;
  Employees.findByIdAndRemove(id, function(err, deletedEmployee){

    //  if(undefined){} - False Value
    //  if("Some Error Code"){} - True Value


    if(err){
      console.log(err);
      res.sendStatus(500);
    }

    res.send(deletedEmployee);
  });
});
*/
/* EXCEEDS EXPECTATIONS MODE
router.put("/", function(req,res){
  var employee = req.body;
  Employees.findById(employee.id, function(err, foundEmployee){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }

      // foundEmployee.name = req.body.name;
      // foundEmployee.position = req.body.position;
      // foundEmployee.salary = req.body.salary;
      foundEmployee.status = !foundEmployee.status;
      foundEmployee.save(function(err, savedEmployee){
        if(err){
          console.log(err);
          res.sendStatus(500);
        }

        res.send(savedEmployee);
      });
  });
});
*/
module.exports = router;
