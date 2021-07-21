import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import lodash from "lodash";
import { SECRET } from "../constants/index.js";



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    avatar: {
        type: String,
        required: true,
        default: "nomedia"
    },
    profileid: {
        ref: "profiles",
        type: mongoose.Schema.Types.ObjectId,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    isprofileverified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        required: false,
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpiresIn: {
        type: Date,
        required: false,
    },
}, { timestamps: true });


UserSchema.pre("save", async function(next) {
    let user = this;
    if (!user.isModified("password")) return next();
    user.password = await bcryptjs.hash(user.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
};


UserSchema.methods.generateJWT = async function() {
    let payload = {
        username: this.username,
        email: this.email,
        name: this.name,
        id: this._id,
    };
    return await jsonwebtoken.sign(payload, SECRET, { expiresIn: "1 day" });
};

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordExpiresIn = Date.now() + 36000000;
    this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
};

UserSchema.methods.getUserInfo = function() {
    return lodash.pick(this, ["_id", "username", "email", "name", "verified", "profileid", "isprofileverified"]);
};

const User = mongoose.model("User", UserSchema);
//module.exports = mongoose.model("User", productSchema);
export default User;