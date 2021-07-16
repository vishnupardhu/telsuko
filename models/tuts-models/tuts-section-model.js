import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModelsectionSchema = new mongoose.Schema({
    modelsectiontitle: {
        type: String,
        required: true,
    },
    modelsectitleslug: {
        type: String,
        required: true,
    },
    modelsectionmedia: {
        type: String,
        required: true,
    },
    modelsectioncategory: {
        type: String,
        required: true,
    },

    modelsectiondescript: {
        type: String,
        required: true,
    },

    modelsectiontotalquestions: {
        type: Number,
        default: 0,

    },
    modelsectiontotalmarks: {
        type: Number,
        default: 0,

    },
    modelsectiontotaltime: {
        type: String,

    },
    sectionuserattemptstatus: {
        type: String,

    },
    modelsectionstatus: {
        type: String,
        required: true,
    },
    modelsectionviewcount: {
        type: Number,
        default: 0,
    },
    modelsectionattemptcount: {
        type: Number,
        default: 0,
    },
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModelsectionSchema.plugin(Paginator);

const modelsections = mongoose.model("modelsections", ModelsectionSchema);
export default modelsections;