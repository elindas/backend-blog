const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    message: {
        type: String,
        required: true,
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
