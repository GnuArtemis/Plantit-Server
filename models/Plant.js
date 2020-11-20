const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    common_name: {
        type: String,
        trim: true,
        required: "What is the name of your plant?"
    },
    scientific_name: {
        type: String,
        trim: true,
        required: "What is the name of your plant?"
    },
    slug: {
        type: String,
        unique: true,
        required: "What is the unique identifier of your plant?"
    },
    //specifications.growth_habit
    growth_habit: {
        type: String,
    },
    image_url: {
        type: String,
        trim: true,
        default: "http://www.coldclimategardening.com/wp-content/uploads/featured-image-placeholder-plants.jpg"
    },
    //common_names.en
    other_names: [String],
    //distribution.native
    native: [String],
    //specifications.average_height
    average_height: Number,
    //specifications.toxicity
    toxicity: String,
    // growth.description
    growth: String,
    //growth.ph_maximum, growth.ph_minimum
    ph_min: Number,
    ph_max: Number,
    //growth.minimum_precipitation, growth.maximum_precipitation
    watering_min: Number,
    watering_max: Number,
    //growth.minimum_temperature.deg_f, growth.maximum_temperature.deg_f
    temperature_min: Number,
    temperature_max: Number,
    //growth.light
    light: Number,
    //growth.sowing OR all the growth soil_
    sowing: String,
    soil_nutriments: Number,
    soil_texture:Number,
    //WHERE sources.name === USDA
    sources: [],
    //growth.growth_months
    growth_months:[String],
    //Voting system? can't get from trefle
    killability:[Number]
    
},{ timestamps: true })
PlantSchema.index({common_name: 'text', scientific_name: 'text'});

const Plant = mongoose.model("Plant", PlantSchema);

module.exports = Plant;