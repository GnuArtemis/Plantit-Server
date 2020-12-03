// Comment schema for the database. Includes the content of the comment, user and plant associations, and timestamps.

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentText: {
        type: String,
        required: "What is the content of your comment?"
    },
    userId:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: "Who wrote the comment?"
    },
    plantId:
    {
        type: Schema.Types.ObjectId,
        ref: "Plant",
        required: "Which plant is this about?"
    }
},{ timestamps: true })
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;