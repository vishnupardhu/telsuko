import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelnoteSchema = new mongoose.Schema({
    ntitle: {
        type: String,
        required: true,
    },
    nmedia: {
        type: String,
        required: true,
    },
    ncat: {
        type: String,
        required: true,
    },
    nsub: {
        type: String,
        required: true,

    },
    ndescriptions: {
        type: String,
        required: true,
    },
    nabout: {
        type: String,
        required: true,
    },
    nchapters: {
        type: Number,
        default: 0,

    },
    ntitleslug: {
        type: String,
        required: true,
    },
    nlikes: {
        type: Number,
        default: 0

    },
    nshare: {
        type: Number,
        default: 0
    },
    nread: {
        type: Number,
        default: 0
    },
    ncomment: {
        type: Number,
        default: 0
    },
    // notes: {
    //     chapter: [{
    //         ref: "modelsections",
    //         type: mongoose.Schema.Types.ObjectId,

    //     }, ],
    // },
    notestatus: {
        type: String,
        required: true,
        default: "unpublished"
    },
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModelnoteSchema.plugin(Paginator);

const modelnotes = mongoose.model("modelnotes", ModelnoteSchema);
export default modelnotes;