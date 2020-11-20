const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const cors = require("cors")

router.use(cors())

router.put("/myplants/delete", (req,res) => {
    db.User.findByIdAndUpdate(req.body.userID,{$pull:{myPlants: req.body.plantID}
    })
    .lean().then(dbUser => {
        res.json(dbUser)
    })
})

router.put("/plant/edit",(req,res)=>{
    db.Plant.findByIdAndUpdate(req.body.plantId,{
        toxicity: req.body.toxicity
    }).lean().then(dbPlant => {
        res.json(dbPlant)
    })
})

router.put("/comment/edit",(req,res)=> {
    db.Comment.findByIdAndUpdate(req.body.commentId, {$set: {commentText: req.body.commentUpdate}})
    .lean().then(dbComment => {
        res.json(dbComment)
    })
})

module.exports = router;
