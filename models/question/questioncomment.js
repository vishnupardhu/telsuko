import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const QuestioncommentSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    questid: {
        ref: "quests",
        type: mongoose.Schema.Types.ObjectId,
    },
    qcomment: {
        type: String,
        required: true,
    },
    questioncommentstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

QuestioncommentSchema.plugin(Paginator);

const questioncomment = mongoose.model("questcomments", QuestioncommentSchema);
export default questioncomment;