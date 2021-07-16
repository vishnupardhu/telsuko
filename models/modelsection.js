import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelsectionSchema = new mongoose.Schema({
    modelsectiontitle: {
        type: String,
        required: true,
    },

    modelsectioncategory: {
        type: String,
        required: true,
    },
    modeldescriptions: {
        type: String,
        required: true,
    },

    modeltotalquestions: {
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
    sectionuserattemptstatus: {
        type: String,
        required: true,
    },
    modelsectionstatus: {
        type: String,
        required: true,
    },



    author: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModelsectionSchema.plugin(Paginator);

const modelsection = mongoose.model("modelsection", ModelsectionSchema);
export default modelsection;