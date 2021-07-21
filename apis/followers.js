import { Router } from "express";

const User = require("../models/User.js");
const Profile = require("../models/Profile.js");

import { uploadProfileCoverpic, uploadProfileAvatar } from "../middlewares/uploader.js";
import { userAuth } from "../middlewares/auth-guard.js";


const router = Router();





router.patch(
    "/api/create-question",
    userAuth,
    uploadProfileAvatar.single("question_media"),
    async(req, res) => {
        //try {
        let { body, file, user } = req;
        console.log(req.file, req.body);
        // let pathy = DOMAIN + "/profiles/avatar/" + file.filename;
        let pathy = file.filename;



        let profile = await Profile.findOne({ account: user._id });
        let profileupdatestatus = await User.findOneAndUpdate({ _id: user._id });
        if (profile) {
            return res.status(400).json({
                success: false,
                message: "your profile already exists",
            });
        }
        let profiley = new Profile({
            ...req.body,
            account: user._id,
            avatar: pathy,

        });
        await profiley.save();
        if (!profileupdatestatus) {
            return res.status(500).json({
                success: false,
                message: "nothing",
            });
        } else {
            profileupdatestatus.isprofileverified = true;
            await profileupdatestatus.save();
        }
        return res.status(201).json({
            success: true,
            messgae: "Profile created successfully.",
        });


    }
);






router.post(
    "/api/create-profile",
    userAuth,
    uploadProfileAvatar.single("avatar"),
    async(req, res) => {
        //try {
        let { body, file, user } = req;
        console.log(req.file, req.body);
        //let pathy = DOMAIN + "/profiles/avatar/" + file.filename;
        let pathy = file.filename;



        let profile = await Profile.findOne({ account: user._id });
        let profileupdatestatus = await User.findOneAndUpdate({ _id: user._id });
        if (profile) {
            return res.status(400).json({
                success: false,
                message: "your profile already exists",
            });
        }
        let profiley = new Profile({
            ...req.body,
            account: user._id,
            avatar: pathy,

        });
        await profiley.save();
        if (!profileupdatestatus) {
            return res.status(500).json({
                success: false,
                message: "nothing",
            });
        } else {
            profileupdatestatus.isprofileverified = true;
            await profileupdatestatus.save();
        }
        return res.status(201).json({
            success: true,
            messgae: "Profile created successfully.",
        });


    }
);

router.put(
    "/api/update-profile-status",
    userAuth,
    async(req, res) => {
        try {

            let path = true;
            let profile = await User.findOneAndUpdate({ _id: user._id }, { isprofileverified: path }, { new: true });
            return res.status(200).json({
                success: true,
                message: "Your profile is now updated",
                profile,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Unable to get the profile.",
            });
        }
    }
);







router.patch("/addprofileimage", userAuth,
    uploadProfileAvatar.single("avatar"), async(req, res) => {
        let { user, file } = req;
        let pathy = file.filename;

        await Profile.findOneAndUpdate({ account: user._id }, {
                $set: {
                    avatar: pathy,
                },
            },
            (err, profile) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "image added successfully updated",
                    cast: pathy,
                    data: profile,
                };
                return res.status(200).send(response);
            }
        );
    });






router.patch("/addcoverimage", userAuth,
    uploadProfileCoverpic.single("coverpic"), (req, res) => {
        let { user, file } = req;
        let pathy = file.filename + ".jpg";

        Profile.findOneAndUpdate({ account: user._id }, {

                $set: {
                    coverpic: pathy,
                },
            },
            (err, profile) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "image added successfully updated",
                    cast: pathy,
                    data: profile,

                };
                return res.status(200).send(response);
            }
        );
    });

router.get("/checkProfile", userAuth, (req, res) => {
    let { user, file } = req;
    Profile.findOne({ account: user._id }, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result == null) {
            return res.json({ status: false, username: user.name });
        } else {
            return res.json({ status: true, username: user.name });
        }
    });
});





router.get("/api/my-profile", userAuth, async(req, res) => {
    try {
        let profile = await Profile.findOne({ account: req.user._id }).populate(
            "account",
            "name email username"
        );
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Your profile is not available.",
            });
        }
        return res.status(200).json({
            success: true,
            profile,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Unable to get the profile.",
        });
    }
});






router.put(
    "/api/update-profile",
    userAuth,
    uploadProfileAvatar.single("avatar"),
    async(req, res) => {
        try {
            let { body, file, user } = req;
            let path = file.filename;

            //let profile = await Profile.findOneAndUpdate({ account: user._id }, { name: body.name, dob: body.dob, city: body.city, state: body.state, country: body.country, about: body.about, gender: body.gender, phone: body.phone, avatar: path }, { new: true });
            let profile = await Profile.findOneAndUpdate({ account: user._id }, { name: body.name, about: body.about, phone: body.phone, avatar: path }, { new: true });

            return res.status(200).json({
                success: true,
                message: "Your profile is now updated",
                profile,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Unable to create the profile.",
            });
        }
    }
);







router.get("/api/profile-user/:username", async(req, res) => {
    try {
        let { username } = req.params;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        let profile = await Profile.findOne({ account: user._id });
        return res.status(200).json({
            profile: {
                ...profile.toObject(),
                account: user.getUserInfo(),
            },
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong.",
        });
    }
});

export default router;