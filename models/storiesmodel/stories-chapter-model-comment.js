import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const StorychapcommentSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    storychapid: {
        ref: "modelstorychap",
        type: mongoose.Schema.Types.ObjectId,
    },
    sccomment: {
        type: String,
        required: true,
    },
    sccommentstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

StorychapcommentSchema.plugin(Paginator);

const storychapcomment = mongoose.model("storychapcomments", StorychapcommentSchema);
export default storychapcomment;