const express = require("express");
const router = express.Router();
const db = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const API = require("../utils/API");
const auth = require("../middleware/auth")
require("dotenv").config()

router.use(cors())

// Checks user authentication

router.get("/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findOne({email: req.body.email});
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

// Login Route
router.post("/login", async (req, res) => {
    const foundUser = db.User.findOne({email: req.body.email})
      .then(foundUser => {
          if (!foundUser) {
            return res.status(404).send("USER NOT FOUND")
          } else {
            return bcrypt.compare(req.body.password, foundUser.password);
          } 
      })
      .then(function(samePassword) {
          if(!samePassword) {
              res.status(403).send("wrong password");
          } else {
              const userInfo = {
                  email: foundUser.email,
                  username: foundUser.username,
                  password: foundUser.password,
                  userToken: API.fetchToken()
              }
              const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: "2h" });
              return res.status(200).json({ token: token })
          }
      })
      .catch(function(error){
          console.log("Error authenticating user: ");
          console.log(error);
      });
})
    
// Gets My Plants with user authentication

router.get("/myplants", (req, res) => {
    const loggedInUser = checkAuthStatus(req);
    console.log(loggedInUser);
    if (!loggedInUser) {
        return res.status(401).send("invalid token")
    } else {
        db.User.find({ username: loggedInUser.username }, { myPlants: 1 })
            .then((result) => {
             res.json(result)
         })
         .catch((err) => {
            res.json(err)
        })
    }
  })


module.exports = router;