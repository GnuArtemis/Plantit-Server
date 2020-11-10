const { Db } = require("mongodb");

const router = require("express").Router();
const db = require("../models");

router.get("/", (req, res) => {
  // db.Plant.create({ name: "lily" }).then(dbPlant => res.send(dbPlant))
  // db.Comment.create({ commentText: "lilies are much better", userId: "5fab161898b4e684907e2705" })
  // .then(({_id})=> db.Plant.findOneAndUpdate({username:"Alex"},{$push: {comments: _id}}, {new: true}))
  // .then(dbComment => console.log(dbComment))

    db.Plant.find({})
    .populate("comments").lean().then(dbPlants=> {
      res.json(dbPlants)
    })
})

router.get("/user", (req, res) => {
  db.User.create({email: "test@test.test", password: "password"});

  db.User.find({}).lean().then(dbUsers => {
    res.json(dbUsers)
  })
})
module.exports = router;