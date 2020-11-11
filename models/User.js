const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: "What is your email address?"
    },
    password: {
        type: String,
        required: "What is your password?"
    },
    myPlants: [
        {
            type: Schema.Types.ObjectId,
            ref: "Plant"
        }
    ],
    myGarden: {
        type: String,
        default:""
    }
})
const User = mongoose.model("User", UserSchema);

module.exports = User;