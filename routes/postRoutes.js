const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const API = require("../utils/API");
const cors = require("cors")

router.use(cors())

router.post("/user",(req,res) => {
    db.User.create({email: req.body.email, password: req.body.password})
    .then(dbUser=> {res.send(dbUser)},err=> {res.send(err)});
})

router.post("/plant",(req,res) => {
    db.Plant.create({
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        growth_habit: req.body.growth_habit,
        
    })
    .then(dbPlant=> {res.send(dbPlant)},err=> {res.send(err)} )
    /* jwt.sign to create token*/
})

router.post("/comment",(req,res) => {
    db.Comment.create({commentText: req.body.commentText, userId: "5fac47b2ae97575ef8b09023", plantId: "5fac482bb61a1085dcb0bd91"})
    .then(dbComment=> {res.send(dbComment)},err=> {res.send(err)} )

} )

router.post("/token", (req, res) => {

    // The parameters for our POST request
    API.fetchToken()
      .then(response => {
        console.log(response)
        res.json(response)
      });

  
  
  
    // const params = {
    //   origin: 'http://localhost:3000/',
    //   // ip: user's api
    //   token: 'NpbVZNazanTbq6IdZi-WePXi9AGzuqXARezyDNnW2bA'
    // }
    //   axios.get({
    //     method: "post",
    //     baseURL: "https://trefle.io/api/auth/claim",
    //     body: JSON.stringify(params),
    //     headers: { 'Content-Type': 'application/json' }
  
    //   }).then (result => {
    //     res.send(result)
    //   }, err => res.send(err))
  })
  


module.exports = router;
