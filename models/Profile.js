import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema({
    account: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
    avatar: {
        type: String,
        required: false,
    },
    coverpic: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: false,
    },

    country: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },

    phone: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    ispopular: {
        type: Boolean,
        required: true,
        default: false,
    },
    // social: {
    //     facebook: {
    //         type: String,
    //         required: false,
    //     },
    //     twitter: {
    //         type: String,
    //         required: false,
    //     },
    //     linkedin: {
    //         type: String,
    //         required: false,
    //     },
    //     instagram: {
    //         type: String,
    //         required: false,
    //     },
    //     github: {
    //         type: String,
    //         required: false,
    //     },
    // },
}, { timestamps: true });

const Profile = mongoose.model("profiles", ProfileSchema);

export default Profile;