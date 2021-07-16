import Paginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
const UsersectionanswerSchema = new mongoose.Schema({
    userid: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    usermodeltestid: {
        ref: "model",
        type: mongoose.Schema.Types.ObjectId,
    },
    usersectionid: {
        ref: "section",
        type: mongoose.Schema.Types.ObjectId,
    },
    sectionattemptstatus: {
        type: String,
        required: true,
    },


    sectionpositive: {
        type: String,
        required: true,
    },
    sectionnegtive: {
        type: String,
        required: true,
    },
    sectionscore: {
        type: Number,
        required: true,
        default: 0
    },
    answerliststatus: {
        type: String,
    },


}, { timestamps: true });

UsersectionanswerSchema.plugin(Paginator);

const usersectionanswers = mongoose.model("usersectionanswer", UsersectionanswerSchema);
export default usersectionanswers;