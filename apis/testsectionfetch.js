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
import { uploadPostImage as uploader } from "../middlewares/uploader.js";

const router = Router();

/**
 * @description To Upload Post Image
 * @api /posts/api/post-image-upload
 * @access private
 * @type POST
 */

router.get("/htests", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await modelsections.countDocuments().exec()) {
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

    let tests = await modelsections.find({
        modelsectionstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
    if (!tests) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        tests,
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


router.get("/homesection/published", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let homesectionpub = await modelsections.find({
        modelsectionstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!homesectionpub) {
        return res.status(404).json({
            success: false,
            message: "no sections available.",
        });
    }
    return res.status(200).json({
        homesectionpub,
        success: true,
        message: "sections available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});

router.get("/search/:searchterm", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await modelsections.countDocuments().exec()) {
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

    var regexv = new RegExp(req.params.searchterm, 'i');
    //  console.log(regexv);
    let testresults = await modelsections.find({ $or: [{ modelsectiontitle: regexv }, { modelsectioncategory: regexv }, { modelsectiondescript: regexv }] }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
    if (!testresults) {
        return res.status(404).json({
            success: false,
            message: "not available.",
        });
    }
    return res.status(200).json({
        testresults,
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
router.get(
    "/homesection/quests/:sectionid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;


        let homequests = await Sectquestlists.find({ sectionid: req.params.sectionid }).populate('questid').populate({
            path: 'userid',
            select: 'profileid',
            populate: { path: 'profileid', select: 'name avatar ispopular' }
        });

        if (homequests) {
            return res.status(200).json({
                homequests,
                success: true,
                message: "found",
            });
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
router.get(
    "/section/myquests/:sectionid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;


        let myquests = await Sectquestlists.find({ userid: user._id, sectionid: req.params.sectionid }).populate('questid').populate({
            path: 'userid',
            select: 'profileid',
            populate: { path: 'profileid', select: 'name avatar ispopular' }
        });

        if (myquests) {
            return res.status(200).json({
                myquests,
                success: true,
                message: "found",
            });
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
router.get(
    "/section/myquestlist/:sectionid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, } = req;

        let myquestlist = await Sectquestlists.find({ userid: user._id, sectionid: req.params.sectionid });
        if (myquestlist) {
            return res.status(200).json({
                myquestlist,
                success: true,
                message: "found",
            });
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
router.get("/api/section", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let section = await modelsections.find({
        userid: user._id
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!section) {
        return res.status(404).json({
            success: false,
            message: "no sections available.",
        });
    }
    return res.status(200).json({
        section,
        success: true,
        message: "sections available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});
router.get("/api/section/published", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let sectionpub = await modelsections.find({
        userid: user._id,
        modelsectionstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!sectionpub) {
        return res.status(404).json({
            success: false,
            message: "no sections available.",
        });
    }
    return res.status(200).json({
        sectionpub,
        success: true,
        message: "sections available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});
router.get("/api/section/unpublished", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let sectionunpub = await modelsections.find({
        userid: user._id,
        modelsectionstatus: "unpublished"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!sectionunpub) {
        return res.status(404).json({
            success: false,
            message: "no sections available.",
        });
    }
    return res.status(200).json({
        sectionunpub,
        success: true,
        message: "sections available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});

router.post("/section/myquestionlist", userAuth, async(req, res) => {
    // try {
    let { user, file, body } = req;
    let myquestlist = await Sectquestlists.find({
        userid: user._id,
        sectionid: body.sectionid,
    }).populate("questid").populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!myquestlist) {
        return res.status(404).json({
            success: false,
            message: "no questions available.",
        });
    }
    return res.status(200).json({
        myquestlist,
        success: true,
        message: "questions available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});
router.post(
    "/sectionfetch/api/section",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype1 = "Blank";

        if (body) {
            if (!file) {
                console.log(req.body);
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
                // let profile = await Profile.findOne({ account: user._id });

                // if (profile) {

                //     if (req.file != null && req.file.type.includes("qmedia")) {
                //         image = "uploads/quests/" + new Date().getTime() + "-" + req.file.name;
                //         image1 = DOMAIN + "/" + new Date().getTime() + "-" + req.file.name;
                //         // Read the file
                //         fileSystem.readFile(req.file.path, function(err, data) {
                //             if (err) throw err;
                //             console.log('File read!');

                //             // Write the file
                //             fileSystem.writeFile(image, data, function(err) {
                //                 if (err) throw err;
                //                 console.log('File written!');
                //             });

                //             // Delete the file
                //             fileSystem.unlink(req.file.path, function(err) {
                //                 if (err) throw err;
                //                 console.log('File deleted!');
                //             });
                //         });
                //     }
                console.log(req.body);
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
/**
 * @description To like a post by authenticated user
 * @api /posts/api/like-post
 * @access private
 * @type PUT
 */


router.get(
    "/test/myrank/:sectionid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;
        var sectionid = req.params.sectionid;

        if (sectionid != null) {
            let testressult = await testrank.findOne({ userid: user._id, sectionid: req.params.sectionid });

            if (testressult === null) {
                return res.status(403).json({
                    status: false,
                    success: false,
                    message: "Your have not attempted the test",
                });
            } else {
                return res.status(201).json({
                    testressult,
                    status: false,
                    success: true,
                    message: "Your have  attempted the Test",
                });
            }

        } else {
            return res.status(501).json({
                success: false,
                message: "try again",
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
router.post("/test/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var testid = body.testid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var testviu = await modelsections.findOneAndUpdate({ _id: testid }, {
            $inc: {
                modelsectionviewcount: 1,
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

    if (testviu != null) {
        return res.status(201).json({
            message: "view updated",
            status: true
        });
    }
    return res.status(404).json({
        message: "no view updated",
        status: false
    });

    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});
router.get(
    "/test/myanswers/:sectionid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user } = req;
        var sectionid = req.params.sectionid;


        if (sectionid != null) {
            let myanswers = await sectionanswer.find({ userid: user._id, sectionid: req.params.sectionid }).populate('questid').populate({
                path: 'questid',

                populate: {
                    path: 'userid',
                    select: 'profileid',
                    populate: { path: 'profileid', select: 'name avatar ispopular' }
                }
            });
            if (myanswers === null) {
                return res.status(403).json({
                    status: false,
                    success: false,
                    message: "Your have not attempted the test",
                });
            } else {
                return res.status(201).json({
                    myanswers,
                    status: false,
                    success: true,
                    message: "Your have  attempted the Test",
                });
            }

        } else {
            return res.status(501).json({
                success: false,
                message: "try again",
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