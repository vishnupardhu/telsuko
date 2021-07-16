import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const NotechapcommentSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    notechapid: {
        ref: "modelnoteschap",
        type: mongoose.Schema.Types.ObjectId,
    },
    nccomment: {
        type: String,
        required: true,
    },
    nccommentstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

NotechapcommentSchema.plugin(Paginator);

const notechapcomment = mongoose.model("notechapcomments", NotechapcommentSchema);
export default notechapcomment;