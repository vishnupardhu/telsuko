import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const StorycommentSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    storyid: {
        ref: "modelstories",
        type: mongoose.Schema.Types.ObjectId,
    },
    scomment: {
        type: String,
        required: true,
    },
    scommentstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

StorycommentSchema.plugin(Paginator);

const storycomment = mongoose.model("storycomments", StorycommentSchema);
export default storycomment;