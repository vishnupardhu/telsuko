import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelsectquestlistsSchema = new mongoose.Schema({
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
    questid: {
        ref: "modelsections",
        type: mongoose.Schema.Types.ObjectId,
    },

    qtype: {
        type: String,
        required: true,

    },
    qcat: {
        type: String,
        required: true,
    },
    qstatus: {
        type: String,
        required: true,
    },

    modelsectionliststatus: {
        type: String,
        required: true,
    },

}, { timestamps: true });

ModelsectquestlistsSchema.plugin(Paginator);

const modelsectquestlists = mongoose.model("modelsectquestlist", ModelsectquestlistsSchema);
export default modelsectquestlists;