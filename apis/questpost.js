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
import rankcard from "../models/question/question-rankcard.js";

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
    "/quest/comment",
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





router.post("/api/quest/like", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var questlikeid = body.questid;
    var questlikeidstatus = body.questlikestatus;
    let questslikein = await Questlike.findOne({ userid: user._id, questid: questlikeid });
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });
    if (!questslikein) {
        if (questslikein === null) {
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
                        qlikecount: +1,
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
        let findsectui = await useranswer.findOne({ ansuserid: user._id, ansquestid: body.questid, answerattemptfrom: attemptfrom });
        if (body.testanswers) {}
        var attemptfrom = "quest";
        let newanswerrespones = await useranswer.findOne({ ansuserid: user._id, ansquestid: body.questid, answerattemptfrom: attemptfrom });
        if (body) {
            if (!newanswerrespones) {
                console.log(req.body);
                let newresponse = new useranswer({
                    ansuserid: user._id,
                    questownerid: body.questcreator,
                    ansquestid: body.questid,
                    ansquestcat: body.questcat,
                    ansquesttype: body.questtype,
                    useranswerreponse: body.useranswerresp,
                    ansquestpositive: body.questpositive,
                    ansquestnegative: body.questnegative,
                    answerattempttype: body.attempttype,
                    answerattemptfrom: attemptfrom,
                    useranswermarks: body.marks,
                    useranswerscore: body.score,
                    userquestattemptcount: 1,
                    useranswerstatus: "valid",
                });
                await newresponse.save();
                await Quest.findOneAndUpdate({ _id: body.questid }, {
                        $inc: {
                            qattemptcount: 1,
                        },
                    },
                    async(err, profile) => {
                        if (err) return res.status(501).send(err);
                        const response = {
                            message: "like updated",
                        };
                    });
                let getrankcard = await rankcard.findOne({ userid: user._id });
                if (getrankcard != null) {
                    let newrankacard = new rankcard({
                        userid: user._id,
                        usermarks: parseFloat(body.marks),
                        userscore: parseInt(body.score),
                        wrongattemptcount: parseInt(body.wrongattempt),
                        rightattemptcount: parseInt(body.rightattempt),
                        wrongmarks: parseFloat(body.questnegative),
                        rightmarks: parseFloat(body.questpositive),
                        accuracy: 0,
                        rankcardstatus: "valid",
                    });
                    await newrankacard.save();
                } else {
                    let mar = parseFloat(getrankcard.usermarks) + parseFloat(body.marks);
                    let sco = parseInt(getrankcard.userscore) + parseInt(body.score);
                    let rigc = parseInt(getrankcard.wrongattemptcount) + parseInt(body.wrongattempt);
                    let wroc = parseInt(getrankcard.rightattemptcount) + parseInt(body.rightattempt);
                    let rigm = parseFloat(getrankcard.rightmarks) + parseFloat(body.rightmarks);
                    let wrom = parseFloat(getrankcard.wrongmarks) + parseFloat(body.wrongmarks);
                    let tot = rigc + wroc;
                    let accuracy = rigc / parseInt(tot);
                    //console.log(req.body, getrankcard.usermarks, mar, sco, rigc, wroc);
                    await rankcard.findOneAndUpdate({ userid: user._id }, {
                            $set: {
                                usermarks: mar,
                                userscore: sco,
                                wrongattemptcount: rigc,
                                rightattemptcount: wroc,
                                wrongmarks: wrom,
                                rightmarks: rigm,
                                accuracy: parseFloat(accuracy),
                            },
                        },
                        async(err, profile) => {
                            if (err) return res.status(501).send(err);
                            const response = {
                                message: "rankcard updated",
                            };
                        });
                }
                return res.status(200).json({
                    status: true,
                    success: true,
                    message: "Your answer is saved.",
                });
            } else {
                return res.status(201).json({
                    status: false,
                    success: true,
                    message: "Your have already answered",
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
    "/quest/response/answer",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;
        var attemptfrom = "quest";
        let newanswerrespones = await useranswer.findOne({ ansuserid: user._id, ansquestid: body.questid, answerattemptfrom: attemptfrom });
        if (body) {
            if (newanswerrespones === null) {
                let newresponse = new useranswer({
                    ansuserid: user._id,
                    questownerid: body.questcreator,
                    ansquestid: body.questid,
                    ansquestcat: body.questcat,
                    ansquesttype: body.questtype,
                    useranswerreponse: body.useranswerresp,
                    ansquestpositive: body.questpositive,
                    ansquestnegative: body.questnegative,
                    answerattempttype: body.attempttype,
                    answerattemptfrom: attemptfrom,
                    useranswermarks: body.marks,
                    useranswerscore: body.score,
                    userquestattemptcount: 1,
                    useranswerstatus: "valid",
                });
                await newresponse.save();
                await Quest.findOneAndUpdate({ _id: body.questid }, {
                        $inc: {
                            qattemptcount: 1,
                        },
                    },
                    async(err, profile) => {
                        if (err) return res.status(501).send(err);
                        const response = {
                            message: "like updated",
                        };
                    });
                let getrankcard = await rankcard.findOne({ userid: user._id });
                if (getrankcard === null) {
                    let newrankacard = new rankcard({
                        userid: user._id,
                        usermarks: (body.marks),
                        userscore: (body.score),
                        wrongattemptcount: (body.wrongattempt),
                        rightattemptcount: (body.rightattempt),
                        wrongmarks: (body.questpositive),
                        rightmarks: (body.questnegative),
                        accuracy: 0,
                        rankcardstatus: "valid",
                    });
                    await newrankacard.save();
                } else {
                    let mar = parseFloat(getrankcard.usermarks) + parseFloat(body.marks);
                    let sco = parseInt(getrankcard.userscore) + parseInt(body.score);
                    let rigc = parseInt(getrankcard.wrongattemptcount) + parseInt(body.wrongattempt);
                    let wroc = parseInt(getrankcard.rightattemptcount) + parseInt(body.rightattempt);
                    let rigm = parseFloat(getrankcard.rightmarks) + parseFloat(body.questpositive);
                    let wrom = parseFloat(getrankcard.wrongmarks) + parseFloat(body.questnegative);
                    var tot = rigc + wroc;
                    var accuracy = rigc % tot;
                    if (accuracy === "NaN") {
                        accuracy = 0;
                    }
                    await rankcard.findOneAndUpdate({ userid: user._id }, {
                        $set: {
                            usermarks: mar,
                            userscore: sco,
                            wrongattemptcount: rigc,
                            rightattemptcount: wroc,
                            wrongmarks: wrom,
                            rightmarks: rigm,
                            accuracy: accuracy,
                        },
                    });
                }
                return res.status(200).json({
                    status: true,
                    success: true,
                    message: "Your answer is saved.",
                });
            } else {
                return res.status(201).json({
                    status: false,
                    success: true,
                    message: "Your have already answered",
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
    "/quest/rank",

    userAuth,

    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype5 = "Mcq-5";
        let getrankcard = await rankcard.findOne({ userid: user._id });
        console.log(getrankcard);
        if (getrankcard != null) {
            let newrankacard = new rankcard({
                userid: user._id,
                usermarks: body.marks,
                userscore: body.score,
                wrongattemptcount: body.wrongattempt,
                rightattemptcount: body.rightattempt,
                rankcardstatus: "valid",
            });
            await newrankacard.save();
        } else {
            console.log(getrankcard);
            var mar = parseFloat(getrankcard.usermarks) + parseFloat(body.marks);
            var sco = parseFloat(getrankcard.userscore) + parseFloat(body.score);
            var rigc = parseFloat(getrankcard.wrongattemptcount) + parseFloat(body.wrongattempt);
            var wroc = parseFloat(getrankcard.rightattemptcount) + parseFloat(body.rightattempt);
            await rankcard.findOneAndUpdate({ userid: user._id }, {
                    $set: {
                        usermarks: parseFloat(mar),
                        userscore: parseFloat(sco),
                        wrongattemptcount: parseFloat(rigc),
                        rightattemptcount: parseFloat(wroc),
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response = {
                        message: "rankcard updated",
                    };
                    return res.status(200).json({
                        status: true,
                        success: true,
                        response,
                        message: "Your answer is saved.",
                    });

                });

        }


    }
);







router.get(
    "/quest/likelist",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        let userp = await User.findOne({ _id: user._id });
        if (userp) {
            let likelist = await Questlike.find({ userid: user._id, questlikestatus: true });
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









router.post(
    "/quest/a/mcq5",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype5 = "Mcq-5";
        if (body) {
            if (file != null) {
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
            if (file != null) {


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
            if (file != null) {


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
            if (file != null) {

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





router.post(
    "/quest/create/blank",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype1 = "Blank";

        if (body) {
            if (file != null) {
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype1,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
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
                    qtype: qtype1,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
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





export default router;