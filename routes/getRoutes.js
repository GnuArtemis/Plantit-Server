const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const API = require("../utils/API")
const cors = require("cors")

router.use(cors())


router.get("/plant/:slug", (req, res) => {
  db.Plant.findOne({ slug: req.params.slug })
    .then(dbPlant => {
      if(dbPlant === null) {
        res.send("doesn't exist yet")
      }

      db.Comment.find({ plantId: req.params.id })
        .populate("userId")
        .then(dbComment => {
          res.send({ dbPlant, dbComment })
        }, err => { res.send(err) });
    }, err => { res.send(err) });
})

router.get("/test", (req, res) => {
  axios.get("https://trefle.io/api/v1/species/sorbus-aucuparia?token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5MzczLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvIiwiaXAiOm51bGwsImV4cGlyZSI6IjIwMjAtMTEtMTQgMDU6MDg6MTYgKzAwMDAiLCJleHAiOjE2MDUzMzA0OTZ9.lAGSUrloI3sOj-Z-7mHwxhkjkaPTJGLayoE53b85IZI")
    .then(response => res.send(response.data))
    .catch(err => res.json(err))
})

// Get all plants from Trefle
router.get("/allplants/:usertoken", (req, res) => {
  console.log("Inside get route");
  API.getAllPlants(req.params.usertoken)
  .then((result) => {
    console.log("Inside the API call");
    res.json(result.data)
  })
    .catch((err) => {
      res.json(err)
    })
})

// Search Trefle API for plant
router.get("/api/search/:query/:usertoken/:page", (req, res) => {
  console.log(req.params.usertoken)

  API.searchPlant(req.params.query, req.params.usertoken, req.params.page).then((result) => {
    const dataFormatted = API.formatSearchResults(result.data);
    console.log(dataFormatted)
    res.json(dataFormatted)
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

//Search database for plants
router.get("/plants/search/:query", (req, res) => {
  db.Plant.find({ $text: { $search: req.params.query } })
    .then(results => {
      if (results.name === "MongoError") {
        console.log("no plant")
        return res.send(null)
        //Where you get the option to add a plant
      } else {
        res.json(results)
      }
    })
    .catch((err) => {
      res.json(err)
    })
})

// Get info from API using the slug key
router.get("/api/slug/:query/:usertoken/info", (req, res) => {
  API.searchSlug(req.params.query, req.params.usertoken)
    .then(result => {
      res.json(result.data)
    })
    .catch((err) => {
      res.json(err)
    })
})

//needs to be updated with user login key
// router.get("/myplants", (req, res) => {
//   db.User.find({ User: "1" }, { myPlants: 1 })
//     .then((result) => {
//       res.json(result)
//     })
//     .catch((err) => {
//       res.json(err)
//     })
// })

router.get("/user/:id", (req, res) => {
  // db.User.create({email: "test@test.test", password: "password"});

  db.User.findOne({_id: req.params.id})
  .populate("myPlants")
  .lean().then(dbUsers => {
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