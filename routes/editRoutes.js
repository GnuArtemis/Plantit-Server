const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const API = require("../utils/API")
const cors = require("cors")
const mongoose = require("mongoose")

router.use(cors())

router.put("/myplants/:userId/:plantId", (req,res) => {
    db.User.findByIdAndUpdate(req.params.userId,{$pull:{myPlants: req.params.plantId}
    })
    .lean().then(dbUser => {
        res.json(dbUser)
    })
})

module.exports = router;
