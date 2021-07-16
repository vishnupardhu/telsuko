import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const AnswerSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    usermodeltestid: {
        ref: "model",
        type: mongoose.Schema.Types.ObjectId,
    },
    usersectionid: {
        ref: "section",
        type: mongoose.Schema.Types.ObjectId,
    },
    userquestionid: {
        ref: "userquestions",
        type: mongoose.Schema.Types.ObjectId,
    },

    userquestioncat: {
        type: String,
        required: true,
    },
    userquestiontype: {
        type: String,
        required: true,
    },
    userqmarkstype: {
        type: String,
        required: true,
    },
    answeredfrom: {
        type: String,
        required: true,
    },
    useranswermarks: {
        type: String,
        required: true,
    },
    useransweredscore: {
        type: String,
        required: true,
    },
    userattemptstatus: {
        type: String,
        required: true,
    },
    useranswercat: {
        type: String,

    },
    userstatus: {
        type: String,

    },


}, { timestamps: true });

AnswerSchema.plugin(Paginator);


const useranswer = mongoose.model("answer", AnswerSchema);
export default useranswer;