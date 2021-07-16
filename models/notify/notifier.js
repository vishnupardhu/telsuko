import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const NotifySchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    otherid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    notifytitle: {
        type: String,
    },
    notifymedia: {
        type: String,
    },
    notifydesc: {
        type: String,
    },
    notifystatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

NotifySchema.plugin(Paginator);

const Notify = mongoose.model("notifys", NotifySchema);
export default Notify;