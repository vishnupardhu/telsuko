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
    "/section/addquestion",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        console.log(body.questid);
        if (body) {

            let findquest = await Sectquestlists.findOne({
                userid: user._id,
                sectionid: body.sectionid,
                questid: body.questid,

            });
            if (!findquest) { // console.log(req.body);
                let section = new Sectquestlists({
                    userid: user._id,
                    sectionid: body.sectionid,
                    questid: body.questid,
                    qtype: body.qtype,
                    qcat: body.qcat,
                    qstatus: body.qstatus,
                    modelsectionliststatus: "published",

                });
                await section.save();
                await modelsections.findOneAndUpdate({ _id: body.sectionid }, {
                        $inc: {
                            modelsectiontotalquestions: 1,
                            modelsectiontotalmarks: 1,
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
                    message: "question added",
                });
            }
            return res.status(201).json({

                success: false,
                message: "question already added",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "please add question properly",
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
    "/quest/create/section",
    userAuth,
    uploader.single("scover"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var mediap = req.file.location;
        if (body) {
            // console.log(req.body);
            let section = new modelsections({
                userid: user._id,
                modelsectionmedia: mediap,
                modelsectiontitle: body.stitle,
                modelsectioncategory: body.scategory,
                modelsectiontotaltime: body.stime,
                modelsectiondescript: body.sdesc,
                modelsectionstatus: "unpublished",
                modelsectitleslug: SlugGenerator(body.stitle),
            });
            await section.save();
            return res.status(200).json({
                section,
                //file,
                success: true,
                message: "Your section is published.",
            });
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

router.post("/section/addquest", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var mysectionid = body.sectionid;
    var myquestid = body.questid;
    if (body) {
        let findquest = await Sectquestlists.findOne({
            userid: user._id,
            sectionid: body.sectionid,
            questid: body.questid,
        });
        if (!findquest) {
            let addquest = new Sectquestlists({
                userid: user._id,
                sectionid: body.sectionid,
                questid: body.questid,
                modelsectionliststatus: "published",
            });
            await addquest.save();

            let findtest = await modelsections.findOneAndUpdate({ _id: body.sectionid });
            var total = 1;
            total = parseInt(findtest.modelsectiontotalmarks) + parseInt(body.questmarks);
            let testviu = await modelsections.findOneAndUpdate({ _id: body.sectionid }, {
                    $inc: {
                        modelsectiontotalquestions: 1,
                    },
                    $set: {
                        modelsectiontotalmarks: parseInt(total),
                    },
                },
                async(err, testviu) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "view updated",
                        status: true

                    };


                });
            return res.status(201).json({

                success: true,
                message: "question added.",
            });
        }
        return res.status(200).json({
            success: false,
            message: "already exists.",
        });

    } else {
        return res.status(404).json({
            success: false,
            message: "Please fill the fields.",
        });
    }
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});

router.post(
    "/publish/tests/statusupdate",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;

        if (body) {
            await modelsections.findOneAndUpdate({ _id: body.sectionid, userid: user._id }, {
                    $set: {
                        modelsectionstatus: "published",
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);

                    return res.status(201).json({

                        success: true,
                        message: "Your test is published.",
                    });

                });

        } else {
            return res.status(404).json({

                success: false,
                message: "Please give required fields.",
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
    // console.log(req.body);
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
    "/test/answers",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;
        var sectionid = body.sectionid;
        var attemptfrom = "section";

        var recordsinserted = false;
        var answerlist = [];
        answerlist = body.myanswers;
        var count = answerlist.length;
        var insertcount = 0;
        // count = answerlist.length;
        console.log("ERR", count);
        console.log("ERR", body);
        if (body) {
            let testressult = await testrank.findOne({ userid: user._id, sectionid: body.sectionid });
            console.log("ERR", testressult);
            if (testressult === null) {



                for (let index = 0; index < answerlist.length; index++) {
                    const element = answerlist[index];
                    let testresponse = await sectionanswer.findOne({ userid: user._id, sectionid: element.sectionid, questid: element.questid, answerattemptfrom: attemptfrom });
                    if (testresponse === null) {
                        sectionanswer.insertMany({
                            userid: user._id,
                            questownerid: element.questcreator,
                            sectionid: element.sectionid,
                            questid: element.questid,
                            questcat: element.questcat,
                            questtype: element.questtype,
                            useranswerreponse: element.useranswerresp,
                            ansquestpositive: element.questpositive,
                            ansquestnegative: parseFloat(element.questnegative),
                            answerattempttype: element.attempttype,
                            answerattemptfrom: attemptfrom,
                            useranswermarks: parseFloat(element.marks),
                            useranswerscore: element.score,
                            noattemptcount: element.noattempt,
                            rightcount: element.rightattempt,
                            wrongcount: element.wrongattempt,
                            answertime: element.questTiming,
                            useranswerstatus: "published",
                        }, { ordered: false })


                    }



                    // let testresponse = await sectionanswer.findOne({ userid: user._id, sectionid: element.sectionid, questid: element.questid, answerattemptfrom: attemptfrom });
                    // if (testresponse === null) {
                    //     let newresponse = new sectionanswer({
                    //         userid: user._id,
                    //         questownerid: element.questcreator,
                    //         sectionid: element.sectionid,
                    //         questid: element.questid,
                    //         questcat: element.questcat,
                    //         questtype: element.questtype,
                    //         useranswerreponse: element.useranswerresp,
                    //         ansquestpositive: element.questpositive,
                    //         ansquestnegative: parseFloat(element.questnegative),
                    //         answerattempttype: element.attempttype,
                    //         answerattemptfrom: attemptfrom,
                    //         useranswermarks: parseFloat(element.marks),
                    //         useranswerscore: element.score,
                    //         noattemptcount: element.noattempt,
                    //         rightcount: element.rightattempt,
                    //         wrongcount: element.wrongattempt,
                    //         answertime: element.questTiming,
                    //         useranswerstatus: "published",
                    //     });
                    //     await newresponse.save();
                    //     insertcount++;
                    //     console.log("ERR", insertcount);
                    //     if (answerlist.length === insertcount) {

                    //         recordsinserted = true;
                    //         console.log("ERR", recordsinserted);
                    //     }

                    // }
                }

                // body.myanswers.forEach(element => {
                //     // let testresponse = await sectionanswer.findOne({ userid: user._id, sectionid: element.sectionid, questid: element.questid, answerattemptfrom: attemptfrom });
                //     // if (!testresponse) {
                //     let newresponse = new sectionanswer({
                //         userid: user._id,
                //         questownerid: element.questcreator,
                //         sectionid: element.sectionid,
                //         questid: element.questid,
                //         questcat: element.questcat,
                //         questtype: element.questtype,
                //         useranswerreponse: element.useranswerresp,
                //         ansquestpositive: element.questpositive,
                //         ansquestnegative: parseFloat(element.questnegative),
                //         answerattempttype: element.attempttype,
                //         answerattemptfrom: attemptfrom,
                //         useranswermarks: parseFloat(element.marks),
                //         useranswerscore: element.score,
                //         noattemptcount: element.noattempt,
                //         rightcount: element.rightattempt,
                //         wrongcount: element.wrongattempt,
                //         answertime: element.questTiming,
                //         useranswerstatus: "published",
                //     });
                //     newresponse.save();
                //     count++;

                //     if (parseInt(body.answercount) === count) {
                //         recordsinserted = true;
                //     }

                // });
                //if (recordsinserted === true) {
                console.log("ERR", body.myresults);
                let newresponse = new testrank({
                    userid: user._id,
                    sectionid: body.myresults.sectionid,
                    totalquestions: (answerlist.length),
                    totalmarksbyme: (body.myresults.totalmarksbyme),
                    totalmarks: (body.myresults.totalmarks),
                    totalscore: (body.myresults.totalscore),
                    rightcouunt: (body.myresults.rightcount),
                    wrongcount: (body.myresults.wrongcount),
                    unattemptcount: (body.myresults.unattemptcount),
                    accuracy: (body.myresults.accuracy),
                    timetakenbyme: (body.myresults.timetakenbyme),
                    totaltime: (body.myresults.totaltime),
                    rankstatus: "published",
                });
                await newresponse.save();
                var testviu = await modelsections.findOneAndUpdate({ _id: body.sectionid }, {
                        $inc: {
                            modelsectionattemptcount: 1,
                        },

                    },
                    async(err, testviu) => {
                        if (err) return res.status(501).send(err);
                        const response = {
                            message: "view updated",
                            status: true
                                //quest: questviu
                        };


                    });
                return res.status(200).json({
                    status: true,
                    success: true,
                    message: "Your test is saved.",
                });
                //  }



            } else {
                return res.status(201).json({
                    status: false,
                    success: true,
                    message: "Your have already attempted the Test",
                });
            }

        } else {
            return res.status(400).json({
                success: false,
                message: "please reattempt the Test",
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