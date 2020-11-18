const mongoose = require("mongoose")

const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: "What is your username?"
    },
    email: {
        type: String,
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
    },
    myGardenImg: {
        type: String,
        default:""
    }
})

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;