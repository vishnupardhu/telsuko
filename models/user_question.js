import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema({
    qtitle: {
        type: String,
        required: true,
    },
    qmedia: {
        type: String,
        required: true,
    },
    qcategory: {
        type: String,
        required: true,
    },
    qtype: {
        type: String,
        required: true,
    },
    qmarkstype: {
        type: String,
        required: true,
    },
    qopt1: {
        type: String,
        required: true,
    },
    qopt2: {
        type: String,
        required: true,
    },
    qopt3: {
        type: String,
        required: true,
    },
    qopt4: {
        type: String,
        required: true,
    },
    qopt5: {
        type: String,
        required: true,
    },
    qans: {
        type: String,
        required: true,
    },
    qmarks: {
        type: Number,
        required: true,
        default: 1
    },
    qnegative: {
        type: Number,
        required: true,
        default: 0
    },
    qexp: {
        type: String,
        required: true,
    },
    qstatus: {
        type: String,
        required: true,
    },
    qslug: {
        type: String,
        required: true,
    },
    qlikes: {
        count: { type: Number, default: 0 },
        user: [{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,

        }, ],
    },
    qshare: {
        count: { type: Number, default: 0 },
        user: [{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,

        }, ],
    },
    qattempts: {
        count: { type: Number, default: 0 },
        user: [{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,

        }, ],
    },

    author: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

QuestionSchema.plugin(Paginator);


const userquestions = mongoose.model("questions", QuestionSchema);
export default userquestions;