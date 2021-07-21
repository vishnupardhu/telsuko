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










router.get("/:searchtext", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)

    // var searchterm = req.params.searchtext.replaceAll('#', '');
    var regexv = new RegExp(req.params.searchtext, 'i');

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

    let quests = await Quest.find({ $or: [{ qtitle: regexv }, { qcategory: regexv }, { qsubcat: regexv }] }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();

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

    let stories = await modelstorychaps.find({ $or: [{ sctitle: regexv }, { scgenere: regexv }, { scdescriptions: regexv }] }).populate('storiesref').populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndexstorychap).exec();


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


    let topics = await modelnoteschaps.find({ $or: [{ nctitle: regexv }, { nccat: regexv }, { ncdescriptions: regexv }] }).populate('notesref').populate("userid", "profileid").populate({
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
    let tests = await modelsections.find({ $or: [{ modelsectiontitle: regexv, modelsectionstatus: "published" }, { modelsectioncategory: regexv, modelsectionstatus: "published" }, { modelsectiondescript: regexv, modelsectionstatus: "published" }] }).populate("userid", "profileid").populate({
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

    let storie = await modelstories.find({ userid: req.params.userid }).populate("userid", "profileid").populate({
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

    let stories = await modelstorychaps.find({ userid: req.params.userid }).populate('storiesref').populate("userid", "profileid").populate({
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

    let topic = await modelnotes.find({ userid: req.params.userid }).populate("userid", "profileid").populate({
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
    let tests = await modelsections.find({ userid: req.params.userid }).populate("userid", "profileid").populate({
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










router.get("/quests", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 7;
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
export default router;