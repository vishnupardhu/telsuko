import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const StorychaplikeSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    storychapid: {
        ref: "modelstorychap",
        type: mongoose.Schema.Types.ObjectId,
    },
    sclikestatus: {
        type: Boolean,
        default: false,
        required: true,
    },
    scstatus: {
        type: String,

    },
}, { timestamps: true });

StorychaplikeSchema.plugin(Paginator);

const storychaplike = mongoose.model("storychaplikes", StorychaplikeSchema);
export default storychaplike;