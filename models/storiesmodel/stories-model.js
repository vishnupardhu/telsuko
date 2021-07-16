import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelstorieSchema = new mongoose.Schema({
    storytitle: {
        type: String,
        required: true,
    },
    storymedia: {
        type: String,
        required: true,
    },
    storygenere: {
        type: String,
        required: true,
    },
    storysubgenere: {
        type: String,
        required: true,
    },
    storydescriptions: {
        type: String,
        required: true,
    },
    storymentions: {
        type: String,
        required: true,
    },
    storieschapters: {
        type: Number,
        default: 0,
    },
    storytitleslug: {
        type: String,
        required: true,
    },
    storylikes: {
        type: Number,
        default: 0
    },
    storycomments: {
        type: Number,
        default: 0
    },
    storyshare: {
        type: Number,
        default: 0
    },
    storyread: {
        type: Number,
        default: 0
    },

    storystatus: {
        type: String,
        required: true,
        default: "unpublished"
    },
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModelstorieSchema.plugin(Paginator);


const modelstories = mongoose.model("modelstories", ModelstorieSchema);
export default modelstories;