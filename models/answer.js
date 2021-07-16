import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const AnswerSchema = new mongoose.Schema({
    authorid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    authormodelid: {
        ref: "model",
        type: mongoose.Schema.Types.ObjectId,
    },
    authorsectionid: {
        ref: "section",
        type: mongoose.Schema.Types.ObjectId,
    },
    authorquestionid: {
        ref: "userquestions",
        type: mongoose.Schema.Types.ObjectId,
    },

    authorquestioncat: {
        type: String,
        required: true,
    },
    authorquestiontype: {
        type: String,
        required: true,
    },
    authorquestionmarks: {
        type: String,
        required: true,
    },
    authorquestionminus: {
        type: String,
        required: true,
    },
    authoranswercat: {
        type: String,
        required: true,
    },
    authorattemptstatus: {
        type: String,
        required: true,
    },
    authorstatus: {
        type: String,
        required: true,
    },
    answeredfrom: {
        type: String,
        required: true,
    },
    answeredscore: {
        type: String,
        required: true,
    },

}, { timestamps: true });

AnswerSchema.plugin(Paginator);


const useranswer = mongoose.model("answer", AnswerSchema);
export default useranswer;