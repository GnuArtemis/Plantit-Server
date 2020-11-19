const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const API = require("../utils/API")
const cors = require("cors")
const mongoose = require("mongoose")

router.use(cors())

router.put("/myplants/delete", (req,res) => {
    db.User.findByIdAndUpdate(req.body.userId,{$pull:{myPlants: req.body.plantId}
    })
    .lean().then(dbUser => {
        res.json(dbUser)
    })
})

router.put("/comment/edit",(req,res)=> {
    db.Comment.findByIdAndUpdate(req.body.commentId, {$set: {commentText: req.body.commentUpdate}})
    .lean().then(dbComment => {
        res.json(dbComment)
    })
})

module.exports = router;
