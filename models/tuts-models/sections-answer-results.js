import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const TestRankSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    questownerid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    sectionid: {
        ref: "section",
        type: mongoose.Schema.Types.ObjectId,
    },

    totalquestions: {
        type: Number,
        //required: true,
    },
    totalmarksbyme: {
        type: Number,
        //required: true,
    },
    totalmarks: {
        type: Number,
        //  required: true,
    },
    totalscore: {
        type: Number,
        // required: true,
    },
    rightcouunt: {
        type: Number,
        default: 0
    },
    wrongcount: {
        type: Number,
        default: 0
    },
    unattemptcount: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        required: true,
    },
    timetakenbyme: {
        type: Number,
        required: true,
        default: 0
    },
    totaltime: {
        type: String,
        required: true,
        default: 0
    },

    rankstatus: {
        type: String,
        default: "unpublished"
    },


}, { timestamps: true });

TestRankSchema.plugin(Paginator);

const testrank = mongoose.model("testranks", TestRankSchema);
export default testrank;