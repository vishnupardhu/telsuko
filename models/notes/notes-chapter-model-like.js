import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const NotechaplikeSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    notechapid: {
        ref: "modelnoteschap",
        type: mongoose.Schema.Types.ObjectId,
    },
    nclikestatus: {
        type: Boolean,
        default: false,
        required: true,
    },
    ncstatus: {
        type: String,

    },
}, { timestamps: true });

NotechaplikeSchema.plugin(Paginator);


const notechaplike = mongoose.model("notechaplikes", NotechaplikeSchema);
export default notechaplike;