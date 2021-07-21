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





router.post(
    "/create/tests",
    userAuth,
    uploader.single("scover"),
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
                let test = new modeltests({
                    userid: user._id,
                    modeltitle: body.mtitle,
                    modelcategory: body.mcategory,
                    modelsubcat: body.msubcat,
                    modeldescriptions: body.mdesc,
                    modelinstructions: body.minst,
                    modelmedia: media,
                    modelstatus: "unpublished",
                    modelslug: SlugGenerator(body.mtitle),
                });
                await test.save();
                return res.status(200).json({
                    test,
                    //file,
                    success: true,
                    message: "Your test is published.",
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
    "/create/test",
    uploader.single("tmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype5 = "Mcq-5";
        if (body) {
            if (!file) {
                let test = new modeltests({
                    userid: user._id,
                    modeltitle: body.mtitle,
                    modelcategory: body.mcategory,
                    modelsubcat: body.msubcat,
                    modeldescriptions: mdesc,
                    modelinstructions: body.minst,
                    modelmedia: "noimage",
                    modelstatus: "unpublished",
                    modelslug: SlugGenerator(body.mtitle),
                });
                await test.save();
                return res.status(200).json({
                    test,
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
    "/publish/tests/statusupdate",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;
        if (body) {
            await modeltests.findOneAndUpdate({ _id: body.testid, userid: user._id }, {
                    $set: {
                        modelstatus: "published",
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
    // 
);


export default router;