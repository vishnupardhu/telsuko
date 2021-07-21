import { Router } from "express";
import { DOMAIN } from "../constants/index.js";

import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

import Quest from "../models/question/quest.js";
import Questlike from "../models/question/questlike.js";
import useranswer from "../models/question/question-answer-model.js";
import questioncomment from "../models/question/questioncomment.js";

import modelnotes from "../models/notes/notes-model.js";
import modelnoteschaps from "../models/notes/notes-chapter-model.js";
import notechaplike from "../models/notes/notes-chapter-model-like.js";
import notelike from "../models/notes/notes-model-like.js";


import Notify from "../models/notify/notifier.js";

import modelstories from "../models/storiesmodel/stories-model.js";
import modelstorychaps from "../models/storiesmodel/stories-chapter-model.js";

import modeltests from "../models/tuts-models/tuts-model.js";
import modelsections from "../models/tuts-models/tuts-section-model.js";
import modelsectionlists from "../models/tuts-models/tuts-sections-list.js";
import modelsectquestlists from "../models/tuts-models/tuts-sections-questionslist.js";


import storychapcomment from "../models/storiesmodel/stories-chapter-model-comment.js";
import storychaplike from "../models/storiesmodel/stories-chapter-model-like.js";
import storylike from "../models/storiesmodel/stories-model-like.js";
import storycomment from "../models/storiesmodel/stories-model-comment.js";



import { userAuth } from "../middlewares/auth-guard.js";
import SlugGenerator from "../functions/slug-generator.js";
import validator from "../middlewares/validator-middleware.js";
import { postValidations } from "../validators/post-validators.js";
import { uploadPostImage as uploader } from "../middlewares/uploader.js";
import { uploadStoriesImage } from "../middlewares/uploader.js";

const router = Router();




router.post(
    "/create/story",
    userAuth,
    uploadStoriesImage.single("scover"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var media = req.file.location;
        if (body) {
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: "file not uploaded.",
                });
            } else {
                let newstorys = new modelstories({
                    userid: user._id,
                    storytitle: body.storytitle,
                    storygenere: body.storygenere,
                    storysubgenere: body.storysubgenere,
                    storydescriptions: body.storydescriptions,
                    storymentions: body.storymentions,
                    storymedia: media,
                    storystatus: "unpublished",
                    storytitleslug: SlugGenerator(body.storytitle),
                });
                await newstorys.save();
                return res.status(201).json({
                    success: true,
                    message: "Your story is published.",
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "please fill the fields",
            });
        }
        // } catch (err) {
        //     return res.status(501).json({
        //         success: false,
        //         message: "Unable to create the quest.",
        //     });
        // }
    }
);






router.post(
    "/create/storychapter",
    userAuth,
    uploadStoriesImage.single("scover"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var storychapmedia = req.file.location;
        if (body) {
            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: "file not uploaded.",
                });
            } else {
                let newstorychaps = new modelstorychaps({
                    userid: user._id,
                    sctitle: body.schaptertitle,
                    scgenere: body.schaptercategory,
                    scdescriptions: body.schapterdesc,
                    storiesref: body.storyid,
                    scmedia: storychapmedia,
                    scstatus: "published",
                    sctitleslug: SlugGenerator(body.schaptertitle),
                });
                await newstorychaps.save();
                await modelstories.findOneAndUpdate({ _id: body.storyid }, {
                        $inc: {
                            storieschapters: +1,
                        },
                    },
                    async(err, profile) => {
                        if (err) return res.status(501).send(err);
                        const response4 = {
                            message: "chapter updated",
                        };
                    });
                return res.status(201).json({
                    success: true,
                    message: "Your story chapter is published.",
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "please fill the fields",
            });
        }
        // } catch (err) {
        //     return res.status(501).json({
        //         success: false,
        //         message: "Unable to create the quest.",
        //     });
        // }
    }
);






router.post(
    "/publish/story/statusupdate",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;

        if (body) {
            await modelstories.findOneAndUpdate({ _id: body.storyid, userid: user._id }, {
                    $set: {
                        storystatus: "published",
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    return res.status(201).json({
                        success: true,
                        message: "Your story is published.",
                    });
                });
        } else {
            return res.status(404).json({
                success: false,
                message: "Please fill the fields.",
            });
        }

    }
    // } catch (err) {
    //     return res.status(501).json({
    //         success: false,
    //         message: "Unable to create the quest.",
    //     });
    // }

);





router.post("/api/quest/like", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var questlikeid = body.questid;
    var questlikeidstatus = body.questlikestatus;
    let questslikein = await Questlike.findOne({ userid: user._id, questid: questlikeid });
    if (!questslikein) {
        if (questslikein.questlikestatus === true) {
            let _questlike = new Questlike({
                userid: user._id,
                questid: questlikeid,
                questlikestatus: true,
                queststatus: "valid",

            });
            await _questlike.save();
            await Quest.findOneAndUpdate({ _id: questlikeid }, {
                    $inc: {
                        qlikecount: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "like updated",
                    };
                });
            return res.status(200).json({
                success: true,
                message: "you liked it",
            });
        } else {
            let _questunlike = new Questlike({
                userid: user._id,
                questid: questlikeid,
                questlikestatus: false,
                queststatus: "valid",
            });
            await _questunlike.save();
            await Quest.findOneAndUpdate({ _id: questlikeid }, {
                    $inc: {
                        qlikecount: -1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "unlike updated",
                    };
                });
            return res.status(200).json({
                success: true,
                message: "you unliked it",
            });
        }
    } else {
        if (questslikein.questlikestatus === false) {
            await Questlike.findOneAndUpdate({ userid: user._id, questid: questlikeid }, {
                    $set: {
                        questlikestatus: true,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response3 = {
                        message: "like updated",
                    };
                    return res.status(201).json({
                        "quest": response3,
                    });
                });
            await Quest.findOneAndUpdate({ _id: questlikeid }, {
                    $inc: {
                        qlikecount: +1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response4 = {
                        message: "like updated",
                    };
                });
        } else {
            await Questlike.findOneAndUpdate({ userid: user._id, questid: questlikeid }, {
                    $set: {
                        questlikestatus: false,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response1 = {
                        message: "unlike updated",
                    };
                    return res.status(201).json({
                        "quest": response1,
                    });
                });
            await Quest.findOneAndUpdate({ _id: questlikeid }, {
                    $inc: {
                        qlikecount: -1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response2 = {
                        message: "unlike updated",
                    };
                });
        }
    }
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});










router.post(
    "/story/comment",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var storyid = body.storyid;
        if (storyid) {
            let newcomment = new questioncomment({
                userid: user._id,
                questid: body.questid,
                qcomment: body.qcomment,
                questioncommentstatus: "published",
            });
            await newcomment.save();
            await Quest.findOneAndUpdate({ _id: storyid }, {
                    $inc: {
                        qcommentscount: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "comment updated",
                    };
                });
            return res.status(200).json({
                success: true,
                message: "Your comment is saved.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Your comment not saved.",
            });
        }


    }
);










router.post(
    "/storychapter/comment",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var questid = body.questid;
        if (questid) {
            let newcomment = new questioncomment({
                userid: user._id,
                questid: body.questid,
                qcomment: body.qcomment,
                questioncommentstatus: "published",
            });

            await newcomment.save();
            await Quest.findOneAndUpdate({ _id: questid }, {
                    $inc: {
                        qcommentscount: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "comment updated",
                    };


                });
            return res.status(200).json({
                success: true,
                message: "Your comment is saved.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Your comment not saved.",
            });
        }


    }
);







router.post(
    "/comments",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var storyid = body.storyid;
        if (storyid) {
            let newcomment = new storycomment({
                userid: user._id,
                storyid: body.storyid,
                scomment: body.scomment,
                scommentstatus: "published",
            });
            await newcomment.save();
            await modelstories.findOneAndUpdate({ _id: storyid }, {
                    $inc: {
                        storycomments: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "comment updated",
                    };
                });
            return res.status(200).json({
                success: true,
                message: "Your comment is saved.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Your comment not saved.",
            });
        }


    }
);






router.post(
    "/comment",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var storyid = body.storyid;
        if (storyid) {
            let newcomment = new storychapcomment({
                userid: user._id,
                storychapid: body.storyid,
                sccomment: body.sccomment,
                sccommentstatus: "published",
            });
            await newcomment.save();
            await modelstorychaps.findOneAndUpdate({ _id: storyid }, {
                    $inc: {
                        sccomments: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "comment updated",
                    };
                });
            return res.status(200).json({
                success: true,
                message: "Your comment is saved.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Your comment not saved.",
            });
        }


    }
);





router.get(
    "/story/likelist",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;

        let userp = await User.findOne({ _id: user._id });
        if (userp) {
            let likelist = await storychaplike.find({ userid: user._id, sclikestatus: true });
            if (userp) {
                return res.status(200).json({
                    likelist,
                    success: true,
                    message: "found",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "not found",
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "not found",
            });
        }
        // } catch (err) {
        //     return res.status(501).json({
        //         success: false,
        //         message: "Unable to create the quest.",
        //     });
        // }
    }
);
export default router;