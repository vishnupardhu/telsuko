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
    modeldescriptions: {
        type: String,
        required: true,
    },
    modelinstructions: {
        type: String,
        required: true,
    },
    modeltotalsection: {
        type: String,
        required: true,
    },
    modeltotalmarks: {
        type: String,
        required: true,
    },
    modeltotaltime: {
        type: String,
        required: true,
    },
    modeluserattemptstatus: {
        type: String,
        required: true,
    },
    modelstatus: {
        type: String,
        required: true,
    },

    modelslug: {
        type: String,
        required: true,
    },
    modellikes: {
        count: { type: Number, default: 0 },
        user: [{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,

        }, ],
    },
    modelshare: {
        count: { type: Number, default: 0 },
        user: [{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,

        }, ],
    },
    modelattempts: {
        count: { type: Number, default: 0 },
        user: [{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,

        }, ],
    },

    author: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true });

ModeltestSchema.plugin(Paginator);

const modeltest = mongoose.model("modeltest", ModeltestSchema);
export default modeltest;