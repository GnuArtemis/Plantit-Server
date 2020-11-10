const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentText: {
        type: String,
        required: "What is the content of your comment?"
    },
    username:{
            type: String,
            required: "Who wrote the comment?"
    }
})
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;