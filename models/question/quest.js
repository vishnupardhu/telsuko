import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const QuestSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    qtitle: {
        type: String,
        required: true,
    },
    qtitleslug: {
        type: String,
        required: true,
    },
    qmedia: {
        type: String,

    },
    qcategory: {
        type: String,
        required: true,
    },
    qsubcat: {
        type: String,
        required: true,
    },
    qtype: {
        type: String,
        required: true,
    },
    qpositive: {
        type: Number,
        required: true,
        default: 0
    },
    qnegative: {
        type: Number,
        required: true,
        default: 0
    },
    qreference: {
        type: String,

    },
    qopt1: {
        type: String,
        required: true,
    },
    qopt2: {
        type: String,

    },
    qopt3: {
        type: String,

    },
    qopt4: {
        type: String,

    },
    qopt5: {
        type: String,

    },
    qans: {
        type: String,
        required: true,
    },
    qexp: {
        type: String,
        required: true,
    },
    qstatus: {
        type: String,
        required: true,
    },
    qviewscount: {
        type: Number,
        default: 0
    },
    qlikecount: {
        type: Number,
        default: 0
    },
    qcommentscount: {
        type: Number,
        default: 0
    },
    qsharecount: {
        type: Number,
        default: 0
    },
    qattemptcount: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

QuestSchema.plugin(Paginator);

const Quest = mongoose.model("quests", QuestSchema);
export default Quest;