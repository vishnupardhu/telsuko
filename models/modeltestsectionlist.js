import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelsectionlistSchema = new mongoose.Schema({
    modelid: {
        type: String,
        required: true,
    },
    modelsectionid: {
        type: String,
        required: true,
    },
    ownerid: {
        type: String,
        required: true,
    },
    modelsectionstatus: {
        type: String,
        required: true,
    },

    modelsectiontotalmarks: {
        type: String,
        required: true,
    },
    modelsectiontotaltime: {
        type: String,
        required: true,
    },
    modelsectiontotalquestions: {
        type: String,
        required: true,
    },

}, { timestamps: true });

ModelsectionlistSchema.plugin(Paginator);


const modelsectionlist = mongoose.model("modeltest", ModelsectionlistSchema);
export default modelsectionlist;