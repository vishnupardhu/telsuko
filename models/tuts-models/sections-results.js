import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const SectionAnswerSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    questownerid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    testid: {
        ref: "model",
        type: mongoose.Schema.Types.ObjectId,
    },
    sectionid: {
        ref: "section",
        type: mongoose.Schema.Types.ObjectId,
    },
    questid: {
        ref: "quests",
        type: mongoose.Schema.Types.ObjectId,
    },

    questcat: {
        type: String,
        required: true,
    },
    questtype: {
        type: String,
        required: true,
    },
    useranswerreponse: {
        type: String,
        required: true,
    },
    questpositive: {
        type: Number,
        default: 0
    },
    questnegative: {
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
    answertime: {
        type: Number,
        default: 0
    },
    rightcount: {
        type: Number,
        default: 0
    },
    wrongcount: {
        type: Number,
        default: 0
    },
    noattemptcount: {
        type: Number,
        default: 0
    },
    useranswerstatus: {
        type: String,
    },


}, { timestamps: true });

SectionAnswerSchema.plugin(Paginator);


const sectionanswer = mongoose.model("sectionanswers", SectionAnswerSchema);
export default sectionanswer;