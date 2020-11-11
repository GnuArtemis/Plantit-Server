const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");

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

router.get("/test", (req,res)=> {
  axios.get("https://trefle.io/api/v1/species/sorbus-aucuparia?token=NpbVZNazanTbq6IdZi-WePXi9AGzuqXARezyDNnW2bA")
  .then(response => res.send(response.data))
  .catch(err => res.json(err))
})

router.get("/user", (req, res) => {
  // db.User.create({email: "test@test.test", password: "password"});

  db.User.find({}).lean().then(dbUsers => {
    res.json(dbUsers)
  })
})
module.exports = router;