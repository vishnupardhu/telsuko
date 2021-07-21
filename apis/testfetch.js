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
import Sectquestlists from "../models/tuts-models/sections-questionslist.js";
import sectionanswer from "../models/tuts-models/sections-results.js";
import testrank from "../models/tuts-models/testrank.js";

import { userAuth } from "../middlewares/auth-guard.js";
import SlugGenerator from "../functions/slug-generator.js";
import validator from "../middlewares/validator-middleware.js";
import { postValidations } from "../validators/post-validators.js";
import { uploadTestImage as uploader } from "../middlewares/uploader.js";

const router = Router();


router.get("/fetch/mytests/unpublished", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let mytests = await modeltests.find({
        userid: user._id,
        modelstatus: "unpublished"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar' }
    }).sort({ "createdAt": -1 });
    if (!mytests) {
        return res.status(404).json({
            success: false,
            message: "no tests available.",
        });
    }
    return res.status(200).json({
        mytests,
        success: true,
        message: "tests available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});




router.get("/fetch/mytests/published", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let mytests = await modeltests.find({
        userid: user._id,
        modelstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar' }
    }).sort({ "createdAt": -1 });
    if (!mytests) {
        return res.status(404).json({
            success: false,
            message: "no tests available.",
        });
    }
    return res.status(200).json({
        mytests,
        success: true,
        message: "tests available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});





export default router;