import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const RankCardSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    usermarks: {
        type: Number,
        default: 0
    },
    userscore: {
        type: Number,
        default: 0
    },
    accuracy: {
        type: Number,
        default: 0
    },
    wrongmarks: {
        type: Number,
        default: 0
    },

    rightmarks: {
        type: Number,
        default: 0
    },
    wrongattemptcount: {
        type: Number,
        default: 0
    },

    rightattemptcount: {
        type: Number,
        default: 0
    },
    totalattemptcount: {
        type: Number,
        default: 0
    },

    rankcardstatus: {
        type: String,
    },


}, { timestamps: true });

RankCardSchema.plugin(Paginator);

const rankcard = mongoose.model("rankcard", RankCardSchema);
export default rankcard;