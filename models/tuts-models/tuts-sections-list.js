import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelsectionlistSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    modelid: {
        ref: "usermodeltestss",
        type: mongoose.Schema.Types.ObjectId,
    },
    sectionid: {
        ref: "modelsections",
        type: mongoose.Schema.Types.ObjectId,
    },
    modelsectiontime: {
        type: String,
        required: true,

    },
    modelsectionmarks: {
        type: String,
        required: true,
    },
    modelsectiontotalquestions: {
        type: String,
        required: true,
    },
    modelsectionstatus: {
        type: String,

    },
    modelsectionliststatus: {
        type: String,
        required: true,
    },

}, { timestamps: true });

ModelsectionlistSchema.plugin(Paginator);

const modelsectionlists = mongoose.model("modelsectionlist", ModelsectionlistSchema);
export default modelsectionlists;