import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const SectionlikeSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    sectionid: {
        ref: "modelsections",
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

SectionlikeSchema.plugin(Paginator);

const sectionlike = mongoose.model("sectionlikes", SectionlikeSchema);
export default sectionlike;