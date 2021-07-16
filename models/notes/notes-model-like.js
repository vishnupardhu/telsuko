import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const NotelikeSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    noteid: {
        ref: "modelnotes",
        type: mongoose.Schema.Types.ObjectId,
    },
    nlikestatus: {
        type: Boolean,
        default: false,
        required: true,
    },
    nstatus: {
        type: String,

    },
}, { timestamps: true });

NotelikeSchema.plugin(Paginator);

const notelike = mongoose.model("notelikes", NotelikeSchema);
export default notelike;