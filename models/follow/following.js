import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const FollowingSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },

    followingid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    followingstatus: {
        type: Boolean,
        default: false,
    },
    followstatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

FollowingSchema.plugin(Paginator);

const Following = mongoose.model("followings", FollowingSchema);
export default Following;