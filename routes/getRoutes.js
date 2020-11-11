const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");

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

router.get("/user", (req, res) => {
  // db.User.create({email: "test@test.test", password: "password"});

  db.User.find({}).lean().then(dbUsers => {
    res.json(dbUsers)
  })
})
module.exports = router;