import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelsectionquestionlistSchema = new mongoose.Schema({
    modelid: {
        type: String,
        required: true,
    },
    modelsectionid: {
        type: String,
        required: true,
    },
    modelsectquestid: {
        type: String,
        required: true,
    },
    ownerid: {
        type: String,
        required: true,
    },
    modelsectionquestionstatus: {
        type: String,
        required: true,
    },



}, { timestamps: true });

ModelsectionquestionlistSchema.plugin(Paginator);

const modelsectionquestlist = mongoose.model("modeltest", ModelsectionquestionlistSchema);
export default modelsectionquestlist;