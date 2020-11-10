const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentText: {
        type: String,
        required: "What is the name of your comment?"
    }
})
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;