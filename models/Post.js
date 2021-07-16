import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    postImage: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        count: { type: Number, default: 0 },
        user: [{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,

        }, ],
    },
    comments: [{
        text: {
            type: String,
            required: true,
        },
        user: {
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,
        },
    }, ],
    author: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

PostSchema.plugin(Paginator);


const Post = mongoose.model("posts", PostSchema);
export default Post;