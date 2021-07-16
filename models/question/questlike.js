import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const QuestlikeSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    questid: {
        ref: "quests",
        type: mongoose.Schema.Types.ObjectId,
    },
    questlikestatus: {
        type: Boolean,
        default: false,
        required: true,
    },
    queststatus: {
        type: String,

    },
}, { timestamps: true });

QuestlikeSchema.plugin(Paginator);

const Questlike = mongoose.model("questlikes", QuestlikeSchema);
export default Questlike;