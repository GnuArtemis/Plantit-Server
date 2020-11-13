const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const API = require("../utils/API")
const Search = require("../utils/Search")

router.get("/plant/:id", (req, res) => {
  db.Plant.findOne({_id:req.params.id})
  .then(dbPlant=> {
    db.Comment.find({plantId : req.params.id})
    .populate("userId")
    .then(dbComment=> {
      res.send({dbPlant, dbComment})
    },err=> {res.send(err)});

  },err=> {res.send(err)});
})

router.get("/test", (req,res)=> {
  axios.get("https://trefle.io/api/v1/species/sorbus-aucuparia?token=NpbVZNazanTbq6IdZi-WePXi9AGzuqXARezyDNnW2bA")
  .then(response => res.send(response.data))
  .catch(err => res.json(err))
})

router.get("/allplants", (req, res) => {
  console.log("Inside get route");
  API().then((result) => {
    console.log("Inside the API call");
    res.json(result.data)
  })
  .catch((err) => {
    res.json(err)
  })
})

// Search Trefle API for plant
router.get("/api/search/:query", (req, res) => {
  console.log(req.params.query)
  Search(req.params.query).then((result) => {
    res.json(result.data)
  })
  .catch((err) => {
    res.json(err)
  })
})

// Returns all plants in the database
router.get("/plants", (req, res) => {
  db.Plant.find({}).lean().then(dbPlants => {
    res.json(dbPlants)
  })
  .catch((err) => {
    res.json(err)
  })
})

router.get("/search/:query", (req, res) => {
  db.Plant.find({ $text: { $search: req.params.query } })
  .then(results => {
    res.json(results)
  })
  .catch((err) => {
    res.json(err)
  })
})

//needs to be updated with user login key
router.get("/myplants", (req, res) => {
  db.User.find({User: "1"}, {myPlants: 1})
  .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    res.json(err)
  })
})

router.get("/user", (req, res) => {
  // db.User.create({email: "test@test.test", password: "password"});

  db.User.find({}).lean().then(dbUsers => {
    res.json(dbUsers)
  })
})
module.exports = router;


// Get all plants in database- get names
// Get plants by search
// Load existing information comments for plant (from table of comments associated with User and Plant)
// Create new user
// Log in with existing account
// Allow user to save plants to My Plants
// Load user plants