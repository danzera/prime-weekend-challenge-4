var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Define HOW Documents will be saved to the Database
var PropertyListingSchema = mongoose.Schema({
  rent: Number,
  cost: Number,
  sqft: Number,
  city: String,
});
// STILL DON'T KNOW WHAT THE FIRST ARGUMENT HERE IS FOR?
var Listings = mongoose.model("listings", PropertyListingSchema);

/* SHOULD WE HAVE 2 SCHEMA??? HYPOTHETICALLY, IF WE DID:
BASED ON STACKOVERFLOW POST & MONGOOSE DOCUMENTATION
http://stackoverflow.com/questions/14453864/use-more-than-one-schema-per-collection-on-mongodb
var RentalPropertySchema = mongoose.Schema({
  rent: Number,
  sqft: Number,
  city: String,
});

var SalePropertySchema = mongoose.Schema({
  cost: Number,
  sqft: Number,
  city: String
});

var collectionName = 'listings';
// STILL DON'T KNOW WHAT THE FIRST ARGUMENT HERE IS FOR?
var Rental = mongoose.model('RentalProp', RentalPropertySchema, collectionName);
var Sale = mongoose.model('SaleProp', SalePropertySchema, collectionName);
*/

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
/* HARD MODE
//Save a new employee
router.post("/", function(req,res){
  //Instance of the Model to be saved to the database
  var employee = new Employees();
  employee.name = req.body.name;
  employee.position = req.body.position;
  employee.salary = req.body.salary;
  employee.status = true;
  employee.save(function(err, savedEmployee){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }

    res.send(savedEmployee);
  });
});
*/
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
