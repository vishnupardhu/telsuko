import { Router } from "express";
import { DOMAIN } from "../constants/index.js";

import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

import Quest from "../models/question/quest.js";
import Questlike from "../models/question/questlike.js";
import useranswer from "../models/question/question-answer-model.js";
import questioncomment from "../models/question/questioncomment.js";


import notechapcomment from "../models/notes/notes-chapter-model-comment.js";
import notecomment from "../models/notes/notes-model-comment.js";
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

import { userAuth } from "../middlewares/auth-guard.js";
import SlugGenerator from "../functions/slug-generator.js";
import validator from "../middlewares/validator-middleware.js";
import { postValidations } from "../validators/post-validators.js";
import { uploadNoteImage as uploader } from "../middlewares/uploader.js";

const router = Router();






router.post(
    "/create/notes",
    userAuth,
    uploader.single("scover"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;

        var nmedia = req.file.location;
        if (body) {
            if (!file) {


                return res.status(404).json({
                    success: false,
                    message: "file not uploaded.",
                });
            } else {
                let note = new modelnotes({
                    userid: user._id,
                    ntitle: body.ntitle,
                    ncat: body.ncategory,

                    ndescriptions: body.ndesc,

                    nmedia: nmedia,
                    notestatus: "unpublished",
                    ntitleslug: SlugGenerator(body.ntitle),
                });
                await note.save();
                return res.status(200).json({
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
    "/create/notechapter",
    userAuth,
    uploader.single("smedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var notechapmedia = "";
        if (body) {
            if (!file) {
                let notechpters = new modelnoteschaps({
                    userid: user._id,
                    nctitle: body.ntitle,
                    nccat: body.ncategory,
                    ncdescriptions: body.ndesc,
                    notesref: body.noteid,
                    ncmedia: "nomedia",
                    ncstatus: "published",
                    nctitleslug: SlugGenerator(body.ntitle),
                });
                await notechpters.save();
                await modelnotes.findOneAndUpdate({ _id: body.noteid }, {
                        $inc: {
                            nchapters: +1,
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
                    message: "Your note chapter is published.",
                });
            } else {
                notechapmedia = req.file.location;
                let notechpters = new modelnoteschaps({
                    userid: user._id,
                    nctitle: body.ntitle,
                    nccat: body.ncategory,
                    ncdescriptions: body.ndesc,
                    notesref: body.noteid,
                    ncmedia: notechapmedia,
                    ncstatus: "published",
                    nctitleslug: SlugGenerator(body.ntitle),
                });
                await notechpters.save();
                await modelnotes.findOneAndUpdate({ _id: body.noteid }, {
                        $inc: {
                            nchapters: +1,
                        },
                    },
                    async(err, profile) => {
                        if (err) return res.status(501).send(err);
                        const response4 = {
                            message: "chapter updated",
                        };
                    });
                return res.status(200).json({
                    success: true,
                    message: "Your note chapter is published.",
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
    "/publish/notes/statusupdate",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;

        if (body) {
            await modelnotes.findOneAndUpdate({ _id: body.noteid, userid: user._id }, {
                    $set: {
                        notestatus: "published",
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
    console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });
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
                    $dec: {
                        qlikecount: 1,
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
    "/comments",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var noteid = body.noteid;
        if (noteid) {
            let newcomment = new notecomment({
                userid: user._id,
                noteid: body.noteid,
                ncomment: body.ncomment,
                ncommentstatus: "published",
            });
            await newcomment.save();
            await modelnotes.findOneAndUpdate({ _id: noteid }, {
                    $inc: {
                        ncomment: 1,
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
        var noteid = body.noteid;
        if (noteid) {
            let newcomment = new notechapcomment({
                userid: user._id,
                notechapid: body.noteid,
                nccomment: body.nccomment,
                nccommentstatus: "published",
            });
            await newcomment.save();
            await modelnoteschaps.findOneAndUpdate({ _id: noteid }, {
                    $inc: {
                        nccomment: 1,
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
    "/notes/likelist",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;

        let userp = await User.findOne({ _id: user._id });
        if (userp) {
            let likelist = await notechaplike.find({ userid: user._id, nclikestatus: true });
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