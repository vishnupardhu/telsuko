import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const NotecommentSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    noteid: {
        ref: "modelnotes",
        type: mongoose.Schema.Types.ObjectId,
    },
    ncomment: {
        type: String,
        required: true,
    },
    ncommentstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

NotecommentSchema.plugin(Paginator);

const notecomment = mongoose.model("notecomments", NotecommentSchema);
export default notecomment;