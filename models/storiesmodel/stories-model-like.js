import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const StorylikeSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    storyid: {
        ref: "modelstories",
        type: mongoose.Schema.Types.ObjectId,
    },
    slikestatus: {
        type: Boolean,
        default: false,
        required: true,
    },
    sstatus: {
        type: String,

    },
}, { timestamps: true });

StorylikeSchema.plugin(Paginator);

const storylike = mongoose.model("storylikes", StorylikeSchema);
export default storylike;