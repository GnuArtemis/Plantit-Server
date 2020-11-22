const { Db } = require("mongodb");
const axios = require("axios")
const router = require("express").Router();
const db = require("../models");
const cors = require("cors")

router.use(cors( {origin: ["http://localhost:3000","https://plantit-site.herokuapp.com"]} ))

router.put("/myplants/delete", (req,res) => {
    db.User.findByIdAndUpdate(req.body.userID,{$pull:{myPlants: req.body.plantID}
    })
    .lean().then(dbUser => {
        res.json(dbUser)
    })
})

router.put("/plant/edit",(req,res)=>{
    db.Plant.findByIdAndUpdate(req.body.plantId,{
        growth_habit: req.body.growth_habit,
        toxicity: req.body.toxicity,
        growth:req.body.growth,
        ph_min:req.body.ph_min,
        ph_max:req.body.ph_max,
        watering_min:req.body.watering_min,
        watering_max:req.body.watering_max,
        temperature_min:req.body.temperature_min,
        temperature_max:req.body.temperature_max,
        light:req.body.light,
        sowing:req.body.sowing,
        soil_nutriments:req.body.soil_nutriments,
        soil_texture:req.body.soil_texture,
        growth_months:req.body.growth_months,
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

router.delete("/comment/delete/:commentId",(req,res)=> {
    db.Comment.findByIdAndDelete(req.params.commentId)
    .lean().then(dbComment => {
        res.json(dbComment)
    })
})

module.exports = router;
