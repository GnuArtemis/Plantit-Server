const express = require("express");
const router = express.Router();
const db = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const API = require("../utils/API");
require("dotenv").config()

router.use(cors())

// Checks user authentication
const checkAuthStatus = (request, res) => {
    if (!request.headers.authorization) {
        console.log("no user")
        return false
    }
    const token = request.headers.authorization.split(" ")[1]
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
           return false;
        }
        else {
            return data
        }
    });
    return loggedInUser
}

// Login Route
router.post("/login", async (req, res) => {
    db.User.findOne({email: req.body.email})
      .then(async foundUser => {
          if (!foundUser) {
            console.error("user not found")
            return res.status(404).send("user not found")
          } else {
            return { samePassword: await bcrypt.compare(req.body.password, foundUser.password), 
                    foundUser }
          } 
      })
      .then(function(validUser) {
          if(!validUser.samePassword) {
              console.error("wrong password")
              res.status(403).send("wrong password");
          } else {
              const userInfo = {
                  email: validUser.foundUser.email,
                  username: validUser.foundUser.username,
                  id: validUser.foundUser._id,
                  myPlants: validUser.foundUser.myPlants,
                  myGarden: validUser.foundUser.myGarden,
                  userToken: API.fetchToken()
              }
              const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: "2h" });
              return res.status(200).json({ token: token, userInfo})
         }
      }) 
      .catch(function(error){
        //   console.log(error)
          console.log("Error authenticating user: ");
      });
})

router.put("/user/:id/garden", (req,res) => {
    
        db.User.findOneAndUpdate({ _id: req.params.id }, {myGarden:req.body.myGarden})
            .then((result) => {
             return res.json(result)
        })
         .catch((err) => {
            return res.json(err)
        })
    
})

router.put("/user/:id/gardenimg", (req,res) => {
    
        db.User.findOneAndUpdate({ _id: req.params.id }, {myGardenImg:req.body.myGardenImg})
            .then((result) => {
             return res.json(result)
        })
         .catch((err) => {
            return res.json(err)
        })
    
})

router.put("/user/:id/location", (req,res) => {
    db.User.findOneAndUpdate({_id: req.params.id }, {location: req.body.location})
    .then((result) => {
        return res.json(result)
    })
    .catch((err) => {
        return res.json(err)
    })
})

router.put("/user/:id/interests", (req,res) => {
    db.User.findOneAndUpdate({_id: req.params.id }, {interests: req.body.interests})
    .then((result) => {
        return res.json(result)
    })
    .catch((err) => {
        return res.json(err)
    })
})

router.put("/user/:id/skills", (req,res) => {
    db.User.findOneAndUpdate({_id: req.params.id }, {skills: req.body.skills})
    .then((result) => {
        return res.json(result)
    })
    .catch((err) => {
        return res.json(err)
    })
})

module.exports = router;