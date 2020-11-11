const axios = require("axios")
const router = require("express").Router();
const db = require("../models");

router.post("/user",(req,res) => {
    db.User.create({email: req.body.email, password: req.body.password})
    .then(dbUser=> {res.send(dbUser)},err=> {res.send(err)});
})

router.post("/plant",(req,res) => {
    db.Plant.create({name: req.body.name})
    .then(dbPlant=> {res.send(dbPlant)},err=> {res.send(err)} )
})

router.post("/comment",(req,res) => {
    db.Comment.create({commentText: req.body.commentText, userId: "5fac47b2ae97575ef8b09023", plantId: "5fac482bb61a1085dcb0bd91"})
    .then(dbComment=> {res.send(dbComment)},err=> {res.send(err)} )

} )


module.exports = router;
