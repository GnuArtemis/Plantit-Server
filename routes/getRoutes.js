const { Db } = require("mongodb");

const router = require("express").Router();
const db = require("../models");
const API = require("../utils/API")

router.get("/", (req, res) => {
  // db.Plant.create({ name: "lily" }).then(dbPlant => res.send(dbPlant))
  db.Comment.create({ commentText: "lilies are so much better", username: "Alexandria" })
  .then(({_id})=> db.Plant.findOneAndUpdate({_id:"5fab0b68f1fef94e9830b507"},{$push: {comments: _id}}, {new: true}))
  .then(dbComment => console.log(dbComment))

    db.Plant.find({})
    .populate("comments").lean().then(dbPlants=> {
      res.json(dbPlants)
    })
})

router.get("/allplants", (req, res) => {
  console.log("Inside get route");
  API().then((result) => {
    console.log("Inside the API call");
    res.json(result)
  })
  .catch((err) => {
    res.json(err)
  })
})


router.get("/user", (req, res) => {
  db.User.create({email: "test@test.test", password: "password"});

  db.User.find({}).lean().then(dbUsers => {
    res.json(dbUsers)
  })
})
module.exports = router;

// Get all plants in database- get names
// Get plants by search
// Post new plant
// Create new comment
// Load existing information comments for plant (from table of comments associated with User and Plant)
// Create new user
// Log in with existing account
// Allow user to save plants to My Plants
// Load user plants