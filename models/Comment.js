const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentText: {
        type: String,
        required: "What is the content of your comment?"
    },
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
})
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;