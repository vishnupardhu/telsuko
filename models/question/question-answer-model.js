import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const AnswerSchema = new mongoose.Schema({
    ansuserid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    questownerid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    ansmodeltestid: {
        ref: "model",
        type: mongoose.Schema.Types.ObjectId,
    },
    anssectionid: {
        ref: "section",
        type: mongoose.Schema.Types.ObjectId,
    },
    ansquestid: {
        ref: "quests",
        type: mongoose.Schema.Types.ObjectId,
    },

    ansquestcat: {
        type: String,
        required: true,
    },
    ansquesttype: {
        type: String,
        required: true,
    },
    useranswerreponse: {
        type: String,
        required: true,
    },
    ansquestpositive: {
        type: Number,
        default: 0
    },
    ansquestnegative: {
        type: Number,
        default: 0
    },
    answerattempttype: {
        type: String,
        required: true,
    },
    answerattemptfrom: {
        type: String,
        required: true,
    },
    useranswermarks: {
        type: Number,
        required: true,
        default: 0
    },
    useranswerscore: {
        type: Number,
        required: true,
        default: 0
    },
    userquestattemptcount: {
        type: Number,
        default: 0
    },
    usermodelattemptcount: {
        type: Number,
        default: 0
    },
    usersectioncount: {
        type: Number,
        default: 0
    },
    useranswerstatus: {
        type: String,
    },


}, { timestamps: true });

AnswerSchema.plugin(Paginator);

const useranswer = mongoose.model("useranswer", AnswerSchema);
export default useranswer;