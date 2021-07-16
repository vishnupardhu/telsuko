import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelnotechapSchema = new mongoose.Schema({
    nctitle: {
        type: String,
        required: true,
    },
    ncmedia: {
        type: String,
        required: true,
    },
    nccat: {
        type: String,
        required: true,
    },
    ncdescriptions: {
        type: String,
        required: true,
    },

    nctitleslug: {
        type: String,
        required: true,
    },
    nclikes: {
        type: Number,
        default: 0

    },
    ncshare: {
        type: Number,
        default: 0
    },
    ncread: {
        type: Number,
        default: 0
    },
    nccomment: {
        type: Number,
        default: 0
    },
    ncstatus: {
        type: String,
        required: true,
        default: "unpublished"
    },
    notesref: {
        ref: "modelnotes",
        type: mongoose.Schema.Types.ObjectId,
    },
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModelnotechapSchema.plugin(Paginator);

const modelnoteschaps = mongoose.model("modelnoteschap", ModelnotechapSchema);
export default modelnoteschaps;