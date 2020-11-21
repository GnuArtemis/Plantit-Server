const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const API = require("../utils/API");
const jwt = require("jsonwebtoken")
const cors = require("cors")
const downloader = require('../utils/imgdownloader')

router.use(cors())

router.post("/user", (req, res) => {
  db.User.create({ email: req.body.email, password: req.body.password, username: req.body.username, userToken: API.fetchToken() })
    .then(dbUser => {
      const userInfo = {
        email: dbUser.email,
        username: dbUser.username,
        id: dbUser._id,
        myPlants: dbUser.myPlants,
        myGarden: dbUser.myGarden,
        myGardenImg: dbUser.myGardenImg,
        userToken: API.fetchToken()
      }
      const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: "2h" });
      return res.status(200).json({ token: token, userInfo })
    })
    .catch(async err => {
      const isEmail = await db.User.findOne({ email: req.body.email })
      const isUsername = await db.User.findOne({ username: req.body.username })
      if (isEmail) {
        return res.status(422).send({ err: "invalid email" })
      } else if (isUsername) {
        return res.status(403).send({ err: "invalid username" })
      } else {
        return res.status(404).send(err)
      }
    })
})

router.post("/myplants/create", (req, res) => {
  db.User.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { myPlants: req.body.plantId } },
    { new: true }
  ).then(dbmyPlants => { res.send(dbmyPlants) },
    err => { res.status(500).send(err) })
})

router.post("/location", (req, res) => {
  db.User.findOneAndUpdate(
    { _id: req.body.userId }, 
    { $push: { location: req.body.location } }, 
    { new: true }
    ).then(dbLocation => { res.send(dbLocation) },
    err => { res.status(500).send(err) })
})

router.post("/plant", (req, res) => {
  db.Plant.create({
    common_name: req.body.common_name,
    scientific_name: req.body.scientific_name,
    growth_habit: req.body.growth_habit,
    slug: req.body.slug
  })
    .then(dbPlant => { res.send(dbPlant) }, err => { res.status(500).send(err) })
  /* jwt.sign to create token*/
})

router.post("/comment", (req, res) => {
  db.Comment.create({
    commentText: req.body.commentText,
    userId: req.body.userId,
    plantId: req.body.plantId
  })
    .then(dbComment => { res.send(dbComment) },
      err => { res.status(500).send(err) })

})

router.post("/token", (req, res) => {

  // The parameters for our POST request
  API.fetchToken()
    .then(response => {
      // console.log(response.data)
      res.json(response.data)
    }, err => res.send(err));
})

// Get info from API using the slug key, then post to the database
router.post("/api/slug/:query/:usertoken", (req, res) => {
  API.searchSlug(req.params.query, req.params.usertoken)
    .then((result) => {

      plantData = result.data.data;
      downloader.downloadImage(plantData.image_url, plantData.slug).then(imgURL => {
        db.Plant.create({
          common_name: plantData.common_name,
          scientific_name: plantData.scientific_name,
          growth_habit: plantData.specifications.growth_habit,
          slug: plantData.slug,
          other_names: plantData.common_names.en,
          image_url: imgURL,
          native: plantData.distribution.native,
          average_height: plantData.specifications.average_height.cm,
          toxicity: plantData.specifications.toxicity,
          growth: plantData.growth.description,
          ph_min: plantData.growth.ph_minimum,
          ph_max: plantData.growth.ph_maximum,
          watering_min: plantData.growth.minimum_precipitation.mm,
          watering_max: plantData.growth.maximum_precipitation.mm,
          temperature_min: plantData.growth.minimum_temperature.deg_f,
          temperature_max: plantData.growth.maximum_temperature.deg_f,
          light: plantData.growth.light,
          sowing: plantData.growth.sowing,
          soil_nutriments: plantData.growth.soil_nutriments,
          soil_texture: plantData.growth.soil_texture,
          sources: plantData.sources,
          growth_months: plantData.growth.growth_months
        })
          .then(dbPlant => { res.send(dbPlant) }, err => { res.status(500).send(err) })
      })
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router;
