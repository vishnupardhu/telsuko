import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const ModeltestSchema = new mongoose.Schema({
    modeltitle: {
        type: String,
        required: true,
    },
    modelmedia: {
        type: String,
        required: true,
    },
    modelcategory: {
        type: String,
        required: true,
    },
    modelsubcat: {
        type: String,
        required: true,

    },
    modeldescriptions: {
        type: String,
        required: true,
    },
    modelinstructions: {
        type: String,
        required: true,
    },
    modeltotalsection: {
        type: Number,
        default: 0,

    },
    modeltotalmarks: {
        type: Number,
        default: 0,
    },
    modeltotaltime: {
        type: String,
        default: "",
    },

    modeltotalquestions: {
        type: Number,
        default: 0,

    },
    modelpremieredate: {
        type: Date,

    },

    modelslug: {
        type: String,
        required: true,
    },
    modellikes: {
        type: Number,
        default: 0

    },
    modelcomment: {
        type: Number,
        default: 0

    },
    modelshare: {
        type: Number,
        default: 0
    },
    modelattempts: {
        type: Number,
        default: 0

    },
    // modelsections: {

    //     section: [{
    //         ref: "modelsections",
    //         type: mongoose.Schema.Types.ObjectId,

    //     }, ],
    // },
    modelstatus: {
        type: String,
        required: true,
        default: "unpublished"
    },
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModeltestSchema.plugin(Paginator);

const modeltests = mongoose.model("modeltest", ModeltestSchema);
export default modeltests;