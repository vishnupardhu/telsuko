import { Router } from "express";
import { DOMAIN } from "../constants/index.js";



import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";


import Quest from "../models/question/quest.js";
import Questlike from "../models/question/questlike.js";

import modelnotes from "../models/notes/notes-model.js";
import modelnoteschaps from "../models/notes/notes-chapter-model.js";

import Notify from "../models/notify/notifier.js";

import modelstories from "../models/storiesmodel/stories-model.js";
import modelstorychaps from "../models/storiesmodel/stories-chapter-model.js";

import modeltests from "../models/tuts-models/tuts-model.js";
import modelsections from "../models/tuts-models/tuts-section-model.js";
import modelsectionlists from "../models/tuts-models/tuts-sections-list.js";
import modelsectquestlists from "../models/tuts-models/tuts-sections-questionslist.js";

import Follow from "../models/follow/followers.js";
import Following from "../models/follow/following.js";



import { uploadProfileAvatars3, uploadProfileCoverpic, uploadProfileAvatar, uploadp, uploadvis } from "../middlewares/uploader.js";
import { userAuth } from "../middlewares/auth-guard.js";
import { profileiid } from "../validators/user-validators.js";
import Validator from "../middlewares/validator-middleware.js";
import SlugGenerator from "../functions/slug-generator.js";
import validator from "../middlewares/validator-middleware.js";


const router = Router();


var cpUpload = uploadvis.fields([{ name: 'avatar', maxCount: 1 }, { name: 'coverpic', maxCount: 1 }]);

router.patch(
    "/api/create-profile",
    userAuth,
    uploadProfileAvatar.single("avatar"),
    async(req, res) => {
        //try {
        let { body, file, user } = req;
        console.log(req.file, req.body);
        // let pathy = DOMAIN + "/profiles/avatar/" + file.filename;
        let pathy = req.file.location;



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
            let profileupdate = await Profile.find({ account: user._id });
            let profileid = profileupdate._id;
            let pname = req.body.name;
            let pavatar = pathy;



        }
        return res.status(201).json({
            success: true,
            messgae: "Profile created successfully.",
        });


        //     await User.findOneAndUpdate({ _id: user._id }, {

        //         isprofileverified = true,

        //     },
        //     (err, data) => {
        //         if (err) return res.status(500).send(err);
        //         const response = {
        //             message: "profile updated successfully",


        //         };
        //         return res.status(200).send(response);
        //     }
        // );

        // } catch (err) {
        //     return res.status(400).json({
        //         success: false,
        //         messgae: "Unable to create your profile.",
        //     });
        // }
    }
);



// router.post(
//     "/quest/create",
//     userAuth,
//     uploadProfileAvatar.single("qmedia"),
//     async(req, res) => {
//         // try {
//         // Create a new Post
//         let { body, user, file } = req;
//         var image, image1 = "";
//         let profile = await Profile.findOne({ account: user._id });

//         if (profile) {

//             if (req.files != null && uploadProfileAvatar.single("qmedia")) {
//                 image = "uploads/quests/" + new Date().getTime() + "-" + req.file.name;
//                 image1 = DOMAIN + "/" + new Date().getTime() + "-" + req.file.name;
//                 // Read the file
//                 fileSystem.readFile(req.file.path, function(err, data) {
//                     if (err) throw err;
//                     console.log('File read!');

//                     // Write the file
//                     fileSystem.writeFile(image, data, function(err) {
//                         if (err) throw err;
//                         console.log('File written!');
//                     });

//                     // Delete the file
//                     fileSystem.unlink(req.file.path, function(err) {
//                         if (err) throw err;
//                         console.log('File deleted!');
//                     });
//                 });
//             }
//             console.log(file.fil);

//             // let quest = new Quest({
//             //     userid: user._id,
//             //     qtitle: body.qtitle,
//             //     qcategory: body.qcategory,
//             //     qtype: body.qtype,
//             //     qpositive: body.qpositive,
//             //     qnegative: body.qnegative,
//             //     qopt1: body.qopt1,
//             //     qans: body.qans,
//             //     qexp: body.qexp,
//             //     qmedia: image1,
//             //     qstatus: "valid",
//             //     qtitleslug: body.qtitle,
//             // });
//             // await quest.save();
//             //   console.log("NEW_POST", post);
//             return res.status(201).json({
//                 //quest,
//                 body,
//                 success: true,
//                 message: "Your quest is published.",
//             });
//         }
//         // } catch (err) {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "Unable to create the quest.",
//         //     });
//         // }
//     }
// );
router.post(
    "/api/create-profile",
    userAuth,
    uploadProfileAvatar.single("avatar"),
    async(req, res) => {
        //try {
        let { body, file, user } = req;
        console.log(file.filename, user._id);
        //let pathy = DOMAIN + "/profiles/avatar/" + file.filename;
        let pathy = req.file.location;

        console.log(pathy, user._id);

        let profile = await Profile.findOne({ account: user._id });

        if (profile) {
            return res.status(400).json({
                success: false,
                message: "your profile already exists",
            });
        }

        let profileupdatestatus = await User.findOne({ _id: user._id });

        if (!profileupdatestatus) {
            return res.status(500).json({
                success: false,
                message: "nothing",
            });
        }
        await User.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    isprofileverified: true,
                },
            },
            (err, profile) => {
                if (err) return res.status(501).send(err);
                const response = {
                    message: "profile updated",

                };

            }
        );

        let profiley = new Profile({
            name: req.body.name,
            about: req.body.about,
            dob: req.body.dob,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            gender: req.body.gender,
            phone: req.body.phone,
            account: user._id,
            avatar: pathy,
        });
        await profiley.save();

        return res.status(201).json({
            success: true,
            messgae: "Profile created successfully.",
        });


        //     await User.findOneAndUpdate({ _id: user._id }, {

        //         isprofileverified = true,

        //     },
        //     (err, data) => {
        //         if (err) return res.status(500).send(err);
        //         const response = {
        //             message: "profile updated successfully",


        //         };
        //         return res.status(200).send(response);
        //     }
        // );

        // } catch (err) {
        //     return res.status(400).json({
        //         success: false,
        //         messgae: "Unable to create your profile.",
        //     });
        // }
    }
);




router.post(
    "/api/addprofile",
    userAuth,
    uploadProfileAvatars3.single("avatar"),
    async(req, res) => {
        //try {
        let { body, file, user } = req;
        console.log(file.filename, user._id);
        //let pathy = DOMAIN + "/profiles/avatar/" + file.filename;
        let pathy = req.file.location;

        console.log(pathy, user._id);

        let profile = await Profile.findOne({ account: user._id });

        if (profile) {
            return res.status(400).json({
                success: false,
                message: "your profile already exists",
            });
        }
        let profiley = new Profile({
            name: req.body.name,
            about: req.body.about,
            dob: req.body.dob,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            gender: req.body.gender,
            phone: req.body.phone,
            account: user._id,
            avatar: pathy,
        });
        await profiley.save();


        let profileupdatestatus = await User.findOne({ _id: user._id });
        let profileupdate = await Profile.findOne({ account: user._id });
        let profileid = profileupdate._id;
        console.log(profileupdate._id);
        if (!profileupdatestatus) {
            return res.status(500).json({
                success: false,
                message: "nothing",
            });
        }
        await User.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    isprofileverified: true,
                    profileid: profileid,
                    name: req.body.name,
                    avatar: pathy,
                },
            },
            (err, profile) => {
                if (err) return res.status(501).send(err);
                const response = {
                    message: "profile updated",

                };

            }
        );
        return res.status(201).json({
            success: true,
            messgae: "Profile created successfully.",
        });


        //     await User.findOneAndUpdate({ _id: user._id }, {

        //         isprofileverified = true,

        //     },
        //     (err, data) => {
        //         if (err) return res.status(500).send(err);
        //         const response = {
        //             message: "profile updated successfully",


        //         };
        //         return res.status(200).send(response);
        //     }
        // );

        // } catch (err) {
        //     return res.status(400).json({
        //         success: false,
        //         messgae: "Unable to create your profile.",
        //     });
        // }
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
router.post("/addprofileimage", userAuth,
    uploadProfileAvatars3.single("avatar"), async(req, res) => {
        let { user, file } = req;
        let pathy = req.file.location;

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

router.patch("/addprofileimage", userAuth,
    uploadProfileAvatars3.single("avatar"), async(req, res) => {
        let { user, file } = req;
        let pathy = req.file.location;

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
    uploadProfileAvatars3.single("coverpic"), (req, res) => {
        let { user, file } = req;
        let pathy = req.file.location;

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
            //return res.json({ status: false });
            return res.status(400).json({
                status: false
            });

        } else {
            // return res.json({ status: true, username: user.name });
            return res.status(200).json({
                status: true,
                username: user.name
            });
        }
    });
});
/**
 * @description To Get the authenticated user's profile
 * @api /profiles/api/my-profile
 * @access Private
 * @type GET
 */
router.get("/api/my-profile", userAuth, async(req, res) => {
    try {
        let profile = await Profile.findOne({ account: req.user._id }).populate(
            "account",
            "name email username"
        );
        let followc = await Follow.findOne({ userid: req.user._id }).countDocuments().exec();
        let followingc = await Following.findOne({ userid: req.user._id }).countDocuments().exec();
        let questc = await Quest.findOne({ userid: req.user._id }).countDocuments().exec();
        let testc = await modelsections.findOne({ userid: req.user._id }).countDocuments().exec();
        let topicsc = await modelnoteschaps.findOne({ userid: req.user._id }).countDocuments().exec();
        let storyc = await modelstorychaps.findOne({ userid: req.user._id }).countDocuments().exec();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Your profile is not available.",
            });
        }
        return res.status(200).json({
            success: true,
            profile,
            followc,
            followingc,
            questc,
            testc,
            topicsc,
            storyc,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Unable to get the profile.",
        });
    }
});



router.get("/api/userprofile", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var userprofileid = req.currentuserid;
    let userprofile = await Profile.findOne({ account: userprofileid }).populate(
        "account",
        "name email username"
    );
    let followc = await Follow.findOne({ userid: userprofileid }).countDocuments().exec();
    let followingc = await Following.findOne({ userid: userprofileid }).countDocuments().exec();
    let questc = await Quest.findOne({ userid: userprofileid }).countDocuments().exec();
    let testc = await modelsections.findOne({ userid: userprofileid }).countDocuments().exec();
    let topicsc = await modelnoteschaps.findOne({ userid: userprofileid }).countDocuments().exec();
    let storyc = await modelstorychaps.findOne({ userid: userprofileid }).countDocuments().exec();

    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "user profile is not available.",
        });
    }
    return res.status(200).json({
        success: true,
        uprofile: userprofile,
        followc,
        followingc,
        questc,
        testc,
        topicsc,
        storyc,

    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});




router.get("/api/quest", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let quests = await Quest.find().populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar' }
    });
    if (!quests) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        success: true,
        quests,
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});
router.post("/apigg/userprofile", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let profile = await User.findOne({ _id: req.body.userid }).populate(
        "profileid",
        "name avatar"
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
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});


router.post("/get/userprofile", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let profile = await Profile.findOne({ account: req.body.profileid }).populate(
        "account",
        "name email username"
    );
    let followc = await Follow.findOne({ userid: req.body.profileid }).countDocuments().exec();
    let followingc = await Following.findOne({ userid: req.body.profileid }).countDocuments().exec();
    let questc = await Quest.findOne({ userid: req.body.profileid }).countDocuments().exec();
    let testc = await modelsections.findOne({ userid: req.body.profileid }).countDocuments().exec();
    let topicsc = await modelnoteschaps.findOne({ userid: req.body.profileid }).countDocuments().exec();
    let storyc = await modelstorychaps.findOne({ userid: req.body.profileid }).countDocuments().exec();
    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Your profile is not available.",
        });
    }
    return res.status(200).json({
        success: true,
        profile,
        followc,
        followingc,
        questc,
        testc,
        topicsc,
        storyc,
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});

/**
 * @description To update autheticated user's profile
 * @type PUT <multipart-form> request
 * @api /profiles/api/update-profile
 * @access Private
 */
router.put(
    "/api/update-profile",
    userAuth,
    uploadProfileAvatars3.single("avatar"),
    async(req, res) => {
        try {
            let { body, file, user } = req;
            let pathy = "";
            pathy = req.file.location;
            //let profile = await Profile.findOneAndUpdate({ account: user._id }, { name: body.name, dob: body.dob, city: body.city, state: body.state, country: body.country, about: body.about, gender: body.gender, phone: body.phone, avatar: path }, { new: true });
            let profile = await Profile.findOneAndUpdate({ account: user._id }, { name: body.name, about: body.about, phone: body.phone, avatar: pathy }, { new: true });

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

router.put(
    "/api/edit-profile",
    userAuth,
    uploadProfileAvatars3.single("avatar"),
    async(req, res) => {
        try {
            let { body, file, user } = req;

            //let profile = await Profile.findOneAndUpdate({ account: user._id }, { name: body.name, dob: body.dob, city: body.city, state: body.state, country: body.country, about: body.about, gender: body.gender, phone: body.phone, avatar: path }, { new: true });
            let profile = await Profile.findOneAndUpdate({ account: user._id }, { name: body.name, about: body.about, phone: body.phone }, { new: true });

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


router.post(
    "/user/unfollow",
    userAuth,
    profileiid,
    Validator,
    async(req, res) => {
        //try {
        let { body, user } = req;
        console.log(req.file, req.body);


        let result = await Following.findOne({ userid: user._id, followingid: req.body.profileid });
        let follow = true;
        // let unfollowing = "unfollowing";
        let results = await Profile.findOne({ account: user._id });
        let name = await results.name;
        let resultp = await Following.findOne({ userid: user._id, followingid: req.body.profileid });
        let resultrp = await Follow.findOne({ userid: req.body.profileid, followerid: user._id });
        // let profileupdatestatus = await User.findOneAndUpdate({ _id: user._id });
        if (result) {
            if (result.followingstatus == false && resultrp.followerstatus == false) {
                return res.status(201).json({
                    success: false,
                    status: true,
                    message: "your already unfollowing",
                });
            } else {

                if (resultp.followingstatus == true) {
                    await Following.findOneAndUpdate({ userid: user._id, followingid: req.body.profileid }, {
                            $set: {
                                followingstatus: false,
                            },
                        },
                        async(err, profile) => {
                            if (err) return res.status(501).send(err);
                            const response = {
                                message: "unfollow updated",

                            };

                        }
                    );
                    if (resultrp.followerstatus == true) {
                        console.log(resultrp.followerstatus);
                        await Follow.findOneAndUpdate({ userid: req.body.profileid, followerid: user._id }, {
                                $set: {
                                    followerstatus: false,
                                },
                            },
                            (err, profile) => {
                                if (err) return res.status(501).send(err);
                                const response = {
                                    message: "unfollow updated",

                                };

                            }
                        );

                    }
                } else {

                    follow = "follow";
                }

                return res.status(201).json({
                    success: false,
                    status: false,
                    message: "your are unfollowing",
                });
            }

        }
        let following = new Following({
            userid: user._id,
            followingid: req.body.profileid,
            followingstatus: false,
            followstatus: "valid",
        });
        await following.save();
        let follower = new Follow({
            userid: req.body.profileid,
            followerid: user._id,
            followerstatus: false,
            followstatus: "valid",
        });
        await follower.save();

        // if (!profileupdatestatus) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "nothing",
        //     });
        // } else {
        //     profileupdatestatus.isprofileverified = true;
        //     await profileupdatestatus.save();
        // }
        return res.status(200).json({
            success: true,
            messgae: "you started unfollowing",
        });


    }
);

router.post(
    "/user/follow",
    userAuth,
    profileiid,
    Validator,
    async(req, res) => {
        //try {
        let { body, user } = req;
        console.log(req.file, req.body);
        let result = await Following.findOne({ userid: user._id, followingid: req.body.profileid });
        let follow = true;
        // let unfollowing = "unfollowing";
        let results = await Profile.findOne({ account: user._id });
        let name = await results.name;
        let resultp = await Following.findOne({ userid: user._id, followingid: req.body.profileid });
        let resultrp = await Follow.findOne({ userid: req.body.profileid, followerid: user._id });
        // let profileupdatestatus = await User.findOneAndUpdate({ _id: user._id });
        if (result) {
            if (result.followingstatus == true && resultrp.followerstatus == true) {
                return res.status(201).json({
                    success: false,
                    status: true,
                    message: "your already following",
                });
            } else {

                if (resultp.followingstatus == false) {
                    await Following.findOneAndUpdate({ userid: user._id, followingid: req.body.profileid }, {
                            $set: {
                                followingstatus: true,
                            },
                        },
                        async(err, profile) => {
                            if (err) return res.status(501).send(err);
                            const response = {
                                message: "follow updated",

                            };

                        }
                    );
                    if (resultrp.followerstatus == false) {
                        console.log(resultrp.followerstatus);
                        await Follow.findOneAndUpdate({ userid: req.body.profileid, followerid: user._id }, {
                                $set: {
                                    followerstatus: true,
                                },
                            },
                            (err, profile) => {
                                if (err) return res.status(501).send(err);
                                const response = {
                                    message: "follow updated",

                                };

                            }
                        );

                    }
                } else {

                    follow = "follow";
                }

                return res.status(201).json({
                    success: false,
                    status: false,
                    message: "your are following",
                });
            }

        }
        let following = new Following({
            userid: user._id,
            followingid: req.body.profileid,
            followingstatus: true,
            followstatus: "valid",
        });
        await following.save();
        let follower = new Follow({
            userid: req.body.profileid,
            followerid: user._id,
            followerstatus: true,
            followstatus: "valid",
        });
        await follower.save();
        let notify = new Notify({
            userid: req.body.profileid,
            otherid: user._id,
            notifytitle: true,
            notifydesc: `${name} started following you`,
            notifystatus: `valid`,
        });
        await notify.save();
        // if (!profileupdatestatus) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "nothing",
        //     });
        // } else {
        //     profileupdatestatus.isprofileverified = true;
        //     await profileupdatestatus.save();
        // }
        return res.status(200).json({
            success: true,
            messgae: "you started following",
        });


    }
);
router.post(
    "/user/getfollowstatus",
    userAuth,
    profileiid,
    Validator,
    async(req, res) => {
        //try {
        let { body, user } = req;
        console.log(req.file, req.body);
        let result = await Following.findOne({ userid: user._id, followingid: req.body.profileid });
        let follow = true;
        // let unfollowing = "unfollowing";
        let results = await Profile.findOne({ account: user._id });
        let name = await results.name;
        let resultp = await Following.findOne({ userid: user._id, followingid: req.body.profileid });
        let resultrp = await Follow.findOne({ userid: req.body.profileid, followerid: user._id });
        // let profileupdatestatus = await User.findOneAndUpdate({ _id: user._id });
        if (result) {
            if (result.followingstatus == true && resultrp.followerstatus == true) {
                return res.status(201).json({
                    success: true,
                    status: true,
                    followstatus: true,
                    message: "your are following",
                });
            } else {

                return res.status(201).json({
                    success: false,
                    status: true,
                    followstatus: false,
                    message: "your are unfollowing",
                });
            }

        }

        return res.status(201).json({
            success: false,
            status: true,
            followstatus: false,
            message: "your are unfollowing",
        });
    }
);

router.get("/user/follow/:profileid", userAuth, profileiid, Validator, async(req, res) => {
    // try {
    let { profileid } = req.params;
    let resu = await Following.findOne({ userid: req.user._id, followingid: profileid });
    if (!resu) {
        return res.status(201).json({
            status: false,
            success: false,
            message: "profile not found.",
        });
    } else {
        if (resu.followingstatus == true) {
            return res.status(200).json({
                success: true,
                status: true,
                message: "profile found.",
            });
        } else {
            return res.status(201).json({
                success: true,
                status: false,
                message: `profile  found. follow status:-${resu.followingstatus}`,
            });
        }

    }

    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Something went wrong.",
    //     });
    // }
});

/**
 * @description To get user's profile with the username
 * @api /profiles/api/update-profile
 * @access Public
 * @type GET
 */
router.get("/api/profile-user/:profileid", userAuth, profileiid, Validator, async(req, res) => {
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