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



    
// Gets My Plants with user authentication

// router.get("/myplants", (req, res) => {
//    const loggedInUser = checkAuthStatus(req)
//     if (!loggedInUser) {
//         console.log("no user")
//         return res.status(401).send("invalid token")
//     } else {
//         db.User.findById(loggedInUser.id)
//         .populate("myPlants")
//             .lean()
//             .then((result) => {
//              return res.json(result)
//          })
//          .catch((err) => {
//             return res.json(err)
//         })
//     }
//   })




module.exports = router;