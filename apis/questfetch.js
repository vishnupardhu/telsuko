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

import { userAuth } from "../middlewares/auth-guard.js";
import SlugGenerator from "../functions/slug-generator.js";
import validator from "../middlewares/validator-middleware.js";
import { postValidations } from "../validators/post-validators.js";
import { uploadPostImage as uploader } from "../middlewares/uploader.js";

const router = Router();





router.post(
    "/api/quests/upload",
    userAuth,
    uploader.single("quest"),
    async(req, res) => {
        try {
            let { file } = req;
            let filename = req.file.location;
            return res.status(200).json({
                filename,
                success: true,
                message: "Image Uploaded Successfully.",
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Unable to create the post.",
            });
        }
    }
);










router.post(
    "/quest/create/mcq5",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype5 = "Mcq-5";
        if (body) {
            if (!file) {

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype5,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qopt3: body.qopt3,
                    qopt4: body.qopt4,
                    qopt5: body.qopt5,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: "noimage",
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                return res.status(200).json({
                    quest,
                    //file,
                    success: true,
                    message: "Your quest is published.",
                });
            } else {
                image = req.file.location;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype5,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qopt3: body.qopt3,
                    qopt4: body.qopt4,
                    qopt5: body.qopt5,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: image,
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                //   console.log("NEW_POST", post);
                return res.status(201).json({
                    quest,
                    success: true,
                    message: "Your quest is published.",
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
    "/quest/create/mcq4",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype4 = "Mcq-4";
        if (body) {
            if (!file) {

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype4,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qopt3: body.qopt3,
                    qopt4: body.qopt4,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: "noimage",
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                return res.status(200).json({
                    quest,
                    //file,
                    success: true,
                    message: "Your quest is published.",
                });
            } else {

                image = req.file.location;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype4,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qopt3: body.qopt3,
                    qopt4: body.qopt4,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: image,
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                //   console.log("NEW_POST", post);
                return res.status(201).json({
                    quest,
                    success: true,
                    message: "Your quest is published.",
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
    "/quest/create/mcq3",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype3 = "Mcq-3";
        if (body) {
            if (!file) {
                console.log(req.body);

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype3,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qopt3: body.qopt3,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: "noimage",
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                return res.status(200).json({
                    quest,
                    //file,
                    success: true,
                    message: "Your quest is published.",
                });
            } else {

                image = req.file.location;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype3,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qopt3: body.qopt3,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: image,
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                //   console.log("NEW_POST", post);
                return res.status(201).json({
                    quest,
                    success: true,
                    message: "Your quest is published.",
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
    "/quest/create/mcq2",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype2 = "Mcq-2";
        if (body) {
            if (!file) {

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype2,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: "noimage",
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                return res.status(200).json({
                    quest,
                    //file,
                    success: true,
                    message: "Your quest is published.",
                });
            } else {

                image = req.file.location;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype2,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt2: body.qopt2,
                    qans: body.qans,
                    qexp: body.qexp,
                    qmedia: image,
                    qstatus: "valid",
                    qtitleslug: SlugGenerator(body.qtitle),
                });
                await quest.save();
                //   console.log("NEW_POST", post);
                return res.status(201).json({
                    quest,
                    success: true,
                    message: "Your quest is published.",
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









router.put(
    "/api/update-post/:id",
    userAuth,
    postValidations,
    validator,
    async(req, res) => {
        try {
            let { id } = req.params;
            let { user, body } = req;
            // Chcek if the post with the id is in the database or not?
            let post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found.",
                });
            }
            if (post.author.toString() !== user._id.toString()) {
                return res.status(401).json({
                    success: false,
                    message: "Post doesn't belong to you.",
                });
            }
            post = await Post.findOneAndUpdate({ author: user._id, _id: id }, {
                ...body,
                slug: SlugGenerator(body.title),
            }, { new: true });
            return res.status(200).json({
                post,
                success: true,
                message: "Post updated successfully.",
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Unable to update the post.",
            });
        }
    }
);









router.post("/api/quest/getanswerresponse", userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;
        var attemptfrom = "quest";
        let getanswerrespones = await useranswer.findOne({ ansuserid: user._id, ansquestid: body.questid, answerattemptfrom: attemptfrom });
        if (body) {
            if (!getanswerrespones) {
                console.log(req.body);
                return res.status(404).json({
                    status: false,
                    success: true,
                    message: "Your answer not founded",
                });
            } else {

                return res.status(200).json({
                    getanswerrespones,
                    status: true,
                    success: true,
                    message: "Your have answered it",
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







router.post("/api/quest/singlefetch", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var questid = body.questid;
    let questsin = await Quest.findOne({ _id: questid }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });
    if (!questsin) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    } else {
        await Quest.findOneAndUpdate({ _id: questid }, {
                $inc: {
                    qviewscount: 1,
                },
            },
            async(err, profile) => {
                if (err) return res.status(501).send(err);
                const response = {
                    message: "view updated",
                };
            });
    }
    return res.status(201).json({
        questsin,
        succcess: true,
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});











router.post("/api/quest/like", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var questlikeid = body.questid;

    let questslikein = await Questlike.findOne({ userid: user._id, questid: questlikeid });
    console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });
    if (questslikein === null) {
        if (questslikein === questslikein) {
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








router.post("/api/quest/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var questviewid = body.questid;
    console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var questviu = await Quest.findOneAndUpdate({ _id: questviewid }, {
            $inc: {
                qviewscount: 1,
            },
        },
        async(err, questviu) => {
            if (err) return res.status(501).send(err);
            const response = {
                message: "view updated",
                quest: questviu
            };
            if (questviu) {
                return res.status(201).json({
                    "quest": response,
                });
            }
            return res.status(404).json({
                "quest": "not found",
            });

        });



    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});







router.get("/api/questy", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let quests = await Quest.find().populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!quests) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        quests,
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});










router.get("/myquests", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let myquests = await Quest.find({ userid: user._id }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!myquests) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        myquests,
        success: true,
        message: "quests available.",
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
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!quests) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        quests,
        success: true,
        message: "quests available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});





router.get("/search/:searchtext", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await Quest.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    var regexv = new RegExp(req.params.searchtext, 'i');
    //  console.log(regexv);
    let questresults = await Quest.find({ $or: [{ qtitle: regexv }, { qcategory: regexv }, { qsubcat: regexv }] }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
    if (!questresults) {
        return res.status(404).json({
            success: false,
            message: "not available.",
        });
    }
    return res.status(200).json({
        questresults,
        success: true,
        message: " available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});







router.get("/quests", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await Quest.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    let quests = await Quest.find().populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
    if (!quests) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        quests,
        success: true,
        message: "quests available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});










router.put("/api/like-post/:id", userAuth, async(req, res) => {
    try {
        let { id } = req.params;
        let post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }

        let user = post.likes.user.map((id) => id.toString());
        if (user.includes(req.user._id.toString())) {
            return res.status(404).json({
                success: false,
                message: "You have already liked this post.",
            });
        }

        post = await Post.findOneAndUpdate({ _id: id }, {
            likes: {
                count: post.likes.count + 1,
                user: [...post.likes.user, req.user._id],
            },
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: "You liked this post.",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Unable to like the post. Please try again later.",
        });
    }
});










router.get(
    "/quest/fetch/comments/:questid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var questid = req.params.questid;
        if (!questid) {
            return res.status(404).json({
                success: false,
                message: "Your comments not found.",
            });
        } else {
            let questcomments = await questioncomment.find({ questid: req.params.questid }).populate("userid", "profileid").populate({
                path: 'userid',
                select: 'profileid',
                populate: { path: 'profileid', select: 'name avatar ispopular' }
            }).sort({ "createdAt": -1 });
            return res.status(200).json({
                questcomments,
                success: true,
                message: "Your comment found.",
            });

        }


    }
);










router.get("/myposts", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;

    console.log("fdf");
    var myuserid = user._id;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)

    // var searchterm = req.params.searchtext.replaceAll('#', '');
    //var regexv = new RegExp(req.params.searchtext, 'i');

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}
    if (endIndex < await Quest.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    let quests = await Quest.find({ userid: myuserid }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();


    const startIndexstory = (page - 1) * limit
    const endIndexstory = page * limit
    const resultsstory = {}
    if (endIndexstory < await modelstories.countDocuments().exec()) {
        resultsstory.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndexstory > 0) {
        resultsstory.previous = {
            page: page - 1,
            limit: limit
        }
    }

    let storie = await modelstories.find({ userid: myuserid }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstory).exec();


    const startIndexstorychap = (page - 1) * limit
    const endIndexstorychap = page * limit
    const resultsstorychap = {}
    if (endIndexstorychap < await modelstorychaps.countDocuments().exec()) {
        resultsstorychap.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndexstorychap > 0) {
        resultsstorychap.previous = {
            page: page - 1,
            limit: limit
        }
    }

    let stories = await modelstorychaps.find({ userid: myuserid }).populate('storiesref').populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstorychap).exec();


    const startIndextopic = (page - 1) * limit
    const endIndextopic = page * limit
    const resultstopic = {}
    if (endIndextopic < await modelnotes.countDocuments().exec()) {
        resultstopic.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndextopic > 0) {
        resultstopic.previous = {
            page: page - 1,
            limit: limit
        }
    }

    let topic = await modelnotes.find({ userid: myuserid }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndextopic).exec();


    const startIndextopicvol = (page - 1) * limit
    const endIndextopicvol = page * limit
    const resultstopicvol = {}
    if (endIndextopicvol < await modelnoteschaps.countDocuments().exec()) {
        resultstopicvol.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndextopicvol > 0) {
        resultstopicvol.previous = {
            page: page - 1,
            limit: limit
        }
    }

    let topics = await modelnoteschaps.find({ userid: myuserid }).populate('notesref').populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndextopicvol).exec();


    const startIndextest = (page - 1) * limit
    const endIndextest = page * limit
    const resultstest = {}



    if (endIndextest < await modelsections.countDocuments().exec()) {
        resultstest.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndextest > 0) {
        resultstest.previous = {
            page: page - 1,
            limit: limit
        }
    }
    let tests = await modelsections.find({ userid: myuserid }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();

    //  modelsectioncategory
    if (quests === null) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        quests,
        stories,
        storie,
        tests,
        topics,
        topic,
        success: true,
        message: "quests available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});
export default router;