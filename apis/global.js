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
router.get("/home", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;

    // console.log("fdf");
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

    let quests = await Quest.find({ qstatus: "valid" }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();


    // const startIndexstory = (page - 1) * limit
    // const endIndexstory = page * limit
    // const resultsstory = {}
    // if (endIndexstory < await modelstories.countDocuments().exec()) {
    //     resultsstory.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndexstory > 0) {
    //     resultsstory.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    // let storie = await modelstories.find({ userid: myuserid }).populate("userid", "profileid").populate({
    //     path: 'userid',
    //     select: 'profileid',
    //     populate: { path: 'profileid', select: 'name avatar ispopular' }
    // }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstory).exec();


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

    let stories = await modelstorychaps.find({ scstatus: "published" }).populate('storiesref').populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstorychap).exec();


    // const startIndextopic = (page - 1) * limit
    // const endIndextopic = page * limit
    // const resultstopic = {}
    // if (endIndextopic < await modelnotes.countDocuments().exec()) {
    //     resultstopic.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndextopic > 0) {
    //     resultstopic.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    // let topic = await modelnotes.find({ userid: myuserid }).populate("userid", "profileid").populate({
    //     path: 'userid',
    //     select: 'profileid',
    //     populate: { path: 'profileid', select: 'name avatar ispopular' }
    // }).sort({ "createdAt": -1 }).limit(limit).skip(startIndextopic).exec();


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


    let topics = await modelnoteschaps.find({ ncstatus: "published" }).populate('notesref').populate("userid", "profileid").populate({
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
    let tests = await modelsections.find({ modelsectionstatus: "published" }).populate("userid", "profileid").populate({
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

        tests,
        topics,

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


router.get("/myposts", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;

    // console.log("fdf");
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


    // const startIndexstory = (page - 1) * limit
    // const endIndexstory = page * limit
    // const resultsstory = {}
    // if (endIndexstory < await modelstories.countDocuments().exec()) {
    //     resultsstory.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndexstory > 0) {
    //     resultsstory.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    // let storie = await modelstories.find({ userid: myuserid }).populate("userid", "profileid").populate({
    //     path: 'userid',
    //     select: 'profileid',
    //     populate: { path: 'profileid', select: 'name avatar ispopular' }
    // }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstory).exec();


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


    // const startIndextopic = (page - 1) * limit
    // const endIndextopic = page * limit
    // const resultstopic = {}
    // if (endIndextopic < await modelnotes.countDocuments().exec()) {
    //     resultstopic.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndextopic > 0) {
    //     resultstopic.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    // let topic = await modelnotes.find({ userid: myuserid }).populate("userid", "profileid").populate({
    //     path: 'userid',
    //     select: 'profileid',
    //     populate: { path: 'profileid', select: 'name avatar ispopular' }
    // }).sort({ "createdAt": -1 }).limit(limit).skip(startIndextopic).exec();


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
    let tests = await modelsections.find({ userid: myuserid, modelsectionstatus: "published" }).populate("userid", "profileid").populate({
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

        tests,
        topics,

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

router.get("/myquests", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;

    // console.log("fdf");
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


    // const startIndexstory = (page - 1) * limit
    // const endIndexstory = page * limit
    // const resultsstory = {}
    // if (endIndexstory < await modelstories.countDocuments().exec()) {
    //     resultsstory.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndexstory > 0) {
    //     resultsstory.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    // let storie = await modelstories.find({ userid: myuserid }).populate("userid", "profileid").populate({
    //     path: 'userid',
    //     select: 'profileid',
    //     populate: { path: 'profileid', select: 'name avatar ispopular' }
    // }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstory).exec();



    //  modelsectioncategory
    if (quests === null) {
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

router.get("/yourposts/:userid", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
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

    let quests = await Quest.find({ userid: req.params.userid }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();


    // const startIndexstory = (page - 1) * limit
    // const endIndexstory = page * limit
    // const resultsstory = {}
    // if (endIndexstory < await modelstories.countDocuments().exec()) {
    //     resultsstory.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndexstory > 0) {
    //     resultsstory.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    // let storie = await modelstories.find({ userid: req.params.userid }).populate("userid", "profileid").populate({
    //     path: 'userid',
    //     select: 'profileid',
    //     populate: { path: 'profileid', select: 'name avatar ispopular' }
    // }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstory).exec();


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

    let stories = await modelstorychaps.find({ userid: req.params.userid }).populate('storiesref').populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstorychap).exec();


    // const startIndextopic = (page - 1) * limit
    // const endIndextopic = page * limit
    // const resultstopic = {}
    // if (endIndextopic < await modelnotes.countDocuments().exec()) {
    //     resultstopic.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndextopic > 0) {
    //     resultstopic.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    // let topic = await modelnotes.find({ userid: req.params.userid }).populate("userid", "profileid").populate({
    //     path: 'userid',
    //     select: 'profileid',
    //     populate: { path: 'profileid', select: 'name avatar ispopular' }
    // }).sort({ "createdAt": -1 }).limit(limit).skip(startIndextopic).exec();


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


    let topics = await modelnoteschaps.find({ userid: req.params.userid }).populate('notesref').populate("userid", "profileid").populate({
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
    let tests = await modelsections.find({ userid: req.params.userid, modelsectionstatus: "published" }).populate("userid", "profileid").populate({
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

        tests,
        topics,

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






router.get("/favourites", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)

    // var searchterm = req.params.searchtext.replaceAll('#', '');
    //var regexv = new RegExp(req.params.searchtext, 'i');

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}
    if (endIndex < await Questlike.countDocuments().exec()) {
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

    let quests = await Questlike.find({ userid: user._id, questlikestatus: true }).populate("questid", "userid").populate({
        path: 'questid',
        populate: { path: 'userid', select: 'profileid', populate: { path: 'profileid', select: 'name avatar ispopular' } }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();


    const startIndexstory = (page - 1) * limit
    const endIndexstory = page * limit
    const resultsstory = {}
    if (endIndexstory < await storychaplike.countDocuments().exec()) {
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

    let stories = await storychaplike.find({ userid: user._id, sclikestatus: true }).populate("storychapid", "userid").populate({
        path: 'storychapid',
        populate: { path: 'userid', select: 'profileid', populate: { path: 'profileid', select: 'name avatar ispopular' } },

    }).populate({
        path: 'storychapid',
        populate: { path: 'storiesref' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstory).exec();


    const startIndexstorychap = (page - 1) * limit
    const endIndexstorychap = page * limit
    const resultsstorychap = {}
    if (endIndexstorychap < await notechaplike.countDocuments().exec()) {
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

    let topics = await notechaplike.find({ userid: user._id, nclikestatus: true }).populate({
        path: 'notechapid ',

        populate: { path: 'userid', select: 'profileid', populate: { path: 'profileid', select: 'name avatar ispopular' } },

    }).populate({
        path: 'notechapid',
        populate: { path: 'notesref' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstorychap).exec();




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
        topics,

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


router.get(
    "/likelist",
    userAuth,
    async(req, res) => {
        try {
            let { body, user, file } = req;
            let questlikelist = await Questlike.find({ userid: user._id, questlikestatus: true });
            let storylikelist = await storychaplike.find({ userid: user._id, sclikestatus: true });
            let topiclikelist = await notechaplike.find({ userid: user._id, nclikestatus: true });
            if (questlikelist != null || storylikelist != null || topiclikelist != null) {
                return res.status(200).json({
                    questlikelist,
                    storylikelist,
                    topiclikelist,
                    success: true,
                    message: "found",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "not found",
                });
            }
        } catch (err) {
            return res.status(501).json({
                success: false,
                message: "something Went wrong..!",
            });
        }
    }
);
router.get(
    "/quest/likelist",
    userAuth,
    async(req, res) => {
        try {
            let { body, user, file } = req;
            let questlikelist = await Questlike.find({ userid: user._id, questlikestatus: true });

            if (questlikelist != null) {
                return res.status(200).json({
                    questlikelist,

                    success: true,
                    message: "found",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "not found",
                });
            }
        } catch (err) {
            return res.status(501).json({
                success: false,
                message: "something Went wrong..!",
            });
        }
    }
);

router.get(
    "/story/likelist",
    userAuth,
    async(req, res) => {
        try {
            let { body, user, file } = req;

            let storylikelist = await storychaplike.find({ userid: user._id, sclikestatus: true });

            if (storylikelist != null) {
                return res.status(200).json({

                    storylikelist,

                    success: true,
                    message: "found",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "not found",
                });
            }
        } catch (err) {
            return res.status(501).json({
                success: false,
                message: "something Went wrong..!",
            });
        }
    }
);

router.get(
    "/topic/likelist",
    userAuth,
    async(req, res) => {
        try {
            let { body, user, file } = req;

            let topiclikelist = await notechaplike.find({ userid: user._id, nclikestatus: true });
            if (topiclikelist != null) {
                return res.status(200).json({

                    topiclikelist,
                    success: true,
                    message: "found",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "not found",
                });
            }
        } catch (err) {
            return res.status(501).json({
                success: false,
                message: "something Went wrong..!",
            });
        }
    }
);
export default router;