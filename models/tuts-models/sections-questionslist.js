import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const SectquestlistsSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },

    sectionid: {
        ref: "modelsections",
        type: mongoose.Schema.Types.ObjectId,
    },
    questid: {
        ref: "quests",
        type: mongoose.Schema.Types.ObjectId,
    },

    // qtype: {
    //     type: String,
    //     required: true,

    // },
    // qcat: {
    //     type: String,
    //     required: true,
    // },
    // qstatus: {
    //     type: String,
    //     required: true,
    // },

    modelsectionliststatus: {
        type: String,
        required: true,
    },

}, { timestamps: true });

SectquestlistsSchema.plugin(Paginator);

const Sectquestlists = mongoose.model("Sectquestlist", SectquestlistsSchema);
export default Sectquestlists;