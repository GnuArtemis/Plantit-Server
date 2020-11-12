const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: "What is the name of your plant?"
    }
})
PlantSchema.index({name: 'text'});

const Plant = mongoose.model("Plant", PlantSchema);

module.exports = Plant;