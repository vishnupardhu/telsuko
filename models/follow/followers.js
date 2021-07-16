import Paginator from "mongoose-paginate-v2";
//const mongoose = require("mongoose");
import mongoose from "mongoose";
const FollowSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    followerid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },

    followerstatus: {
        type: Boolean,
        default: false,
    },
    followstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

FollowSchema.plugin(Paginator);


const Follow = mongoose.model("follows", FollowSchema);
export default Follow;