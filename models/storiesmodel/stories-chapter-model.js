import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelstorychapSchema = new mongoose.Schema({
    sctitle: {
        type: String,
        required: true,
    },
    scmedia: {
        type: String,
        required: true,
    },
    scgenere: {
        type: String,
        required: true,
    },

    scdescriptions: {
        type: String,
        required: true,
    },
    sctitleslug: {
        type: String,
        required: true,
    },
    sclikes: {
        type: Number,
        default: 0

    },
    sccomments: {
        type: Number,
        default: 0

    },
    scshare: {
        type: Number,
        default: 0
    },
    scread: {
        type: Number,
        default: 0
    },
    storiesref: {
        ref: "modelstories",
        type: mongoose.Schema.Types.ObjectId,
    },
    scstatus: {
        type: String,
        required: true,
        default: "published"
    },
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModelstorychapSchema.plugin(Paginator);

const modelstorychaps = mongoose.model("modelstorychap", ModelstorychapSchema);
export default modelstorychaps;