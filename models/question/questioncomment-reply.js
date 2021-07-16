import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const QuestionreplySchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    questionid: {
        ref: "questions",
        type: mongoose.Schema.Types.ObjectId,
    },
    questioncommentid: {
        ref: "questions",
        type: mongoose.Schema.Types.ObjectId,
    },
    qreply: {
        type: String,
        required: true,
    },
    questioncommentstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

QuestionreplySchema.plugin(Paginator);

const questionreply = mongoose.model("questioncomments", QuestionreplySchema);
export default questionreply;