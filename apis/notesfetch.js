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
import { uploadPostImage as uploader } from "../middlewares/uploader.js";

const router = Router();




router.get("/chapters", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await modelnoteschaps.countDocuments().exec()) {
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

    let tests = await modelnoteschaps.find({
        ncstatus: "published"
    }).populate('notesref').populate("userid", "profileid").populate({
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




router.get("/fetch/homestory", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let newstories = await modelstories.find({ notestatus: "published" }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!newstories) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        newstories,
        success: true,
        message: "stories available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});








router.get("/fetch/homenotes/:noteid", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    let homenotesview = await modelnotes.findById({
        _id: req.params.noteid,
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!homenotesview) {
        return res.status(404).json({
            success: false,
            message: "no notes chapter available.",
        });
    }
    return res.status(200).json({
        homenotesview,
        success: true,
        message: "notes chapter available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});






router.get("/homenotes/chapters/", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;

    let homenoteschaps = await modelnoteschaps.find({
        ncstatus: "published"
    }).populate('notesref').populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!homenoteschaps) {
        return res.status(404).json({
            success: false,
            message: "no Topics available.",
        });
    }
    return res.status(200).json({
        homenoteschaps,
        success: true,
        message: "Topics available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});








router.get("/fetch/homenotes/chapters/", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;

    let homenoteschaps = await modelnoteschaps.find({
        ncstatus: "published"
    }).populate("notesref").populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!homenoteschaps) {
        return res.status(404).json({
            success: false,
            message: "no Topics available.",
        });
    }
    return res.status(200).json({
        homenoteschaps,
        success: true,
        message: "Topics available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});









router.get("/fetch/notes/getchapters/:noteid", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    let allnotespubchaps = await modelnoteschaps.find({
        notesref: req.params.noteid,
        ncstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!allnotespubchaps) {
        return res.status(404).json({
            success: false,
            message: "no notes chapter available.",
        });
    }
    return res.status(200).json({
        allnotespubchaps,
        success: true,
        message: "notes chapter available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});







router.get("/fetch/mynotes/unpublished", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let notesunpub = await modelnotes.find({
        userid: user._id,
        notestatus: "unpublished"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!notesunpub) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        notesunpub,
        success: true,
        message: "stories available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});









router.get("/fetch/mynotes/published", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let notespub = await modelnotes.find({
        userid: user._id,
        notestatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!notespub) {
        return res.status(404).json({
            success: false,
            message: "no notes available.",
        });
    }
    return res.status(200).json({
        notespub,
        success: true,
        message: "notes available.",
    });
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

    var questviu = await Quest.find({ _id: questviewid }, {
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






router.get("/fetch/mynotes/chapters/:noteid", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;

    let notespubchaps = await modelnoteschaps.find({
        userid: user._id,
        notesref: req.params.noteid,
        ncstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!notespubchaps) {
        return res.status(404).json({
            success: false,
            message: "no notes chapter available.",
        });
    }
    return res.status(200).json({
        notespubchaps,
        success: true,
        message: "notes chapter available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});









router.post("/fetch/mynotes/chapters", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var mynoteid = body.noteid;
    let noteschap = await modelnoteschaps.find({
        userid: user._id,
        notesref: mynoteid,
        ncstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!noteschap) {
        return res.status(404).json({
            success: false,
            message: "no notes chapter available.",
        });
    }
    return res.status(200).json({
        noteschap,
        success: true,
        message: "notes chapter available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});







router.post("/fetch/homenotes/chapters", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var mynoteid = body.noteid;
    let noteschap = await modelnoteschaps.find({
        notesref: mynoteid,
        ncstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!noteschap) {
        return res.status(404).json({
            success: false,
            message: "no notes chapter available.",
        });
    }
    return res.status(200).json({
        noteschap,
        success: true,
        message: "notes chapter available.",
    });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});







router.post("/homenotes/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var noteid = body.noteid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var questviu = await modelnotes.findOneAndUpdate({ _id: noteid }, {
            $inc: {
                nread: 1,
            },
        },
        async(err, up) => {
            if (err) return res.status(501).send(err);
            const response = {
                message: "view updated",
                success: true,
            };
            if (questviu) {
                return res.status(201).json({
                    message: "view updated",
                    success: true,
                });
            }
            return res.status(404).json({
                message: "view not updated",
                success: false,
            });
        });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});









router.post("/homenotes/chapter/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var noteid = body.noteid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var questviu = await modelnoteschaps.findOneAndUpdate({ _id: noteid }, {
            $inc: {
                ncread: 1,
            },
        },
        async(err, up) => {
            if (err) return res.status(501).send(err);
            const response = {
                message: "view updated",
                success: true,
            };
            if (questviu) {
                return res.status(201).json({
                    message: "view updated",
                    success: true,
                });
            }
            return res.status(404).json({
                message: "view not updated",
                success: false,
            });
        });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});









router.post("/home/notes/chapter/like", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var notelikeid = body.noteid;

    let notelikein = await notechaplike.findOne({ userid: user._id, notechapid: notelikeid });

    if (notelikein === null) {
        if (notelikein === notelikein) {
            let _nclike = new notechaplike({
                userid: user._id,
                notechapid: notelikeid,
                nclikestatus: true,
                ncstatus: "valid",
            });
            await _nclike.save();
            await modelnoteschaps.findOneAndUpdate({ _id: notelikeid }, {
                    $inc: {
                        nclikes: 1,
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
            let _ncunlike = new notechaplike({
                userid: user._id,
                notechapid: notelikeid,
                nclikestatus: false,
                ncstatus: "valid",
            });
            await _ncunlike.save();
            await modelnoteschaps.findOneAndUpdate({ _id: notelikeid }, {
                    $inc: {
                        nclikes: -1,
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

        if (notelikein.nclikestatus === false) {
            await notechaplike.findOneAndUpdate({ userid: user._id, notechapid: notelikeid }, {
                    $set: {
                        nclikestatus: true,
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

            await modelnoteschaps.findOneAndUpdate({ _id: notelikeid }, {
                    $inc: {
                        nclikes: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response4 = {
                        message: "like updated",
                    };


                });

        } else {

            await notechaplike.findOneAndUpdate({ userid: user._id, notechapid: notelikeid }, {
                    $set: {
                        nclikestatus: false,
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

            await modelnoteschaps.findOneAndUpdate({ _id: notelikeid }, {
                    $dec: {
                        nclikes: 1,
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









router.post("/home/notes/chapter/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var noteid = body.noteid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var notechapviu = await modelnoteschaps.findOneAndUpdate({ _id: noteid }, {
            $inc: {
                ncread: 1,
            },
        },
        async(err, notechapviu) => {
            if (err) return res.status(501).send(err);
            const response = {
                message: "view updated",

            };
            if (notechapviu) {
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










router.post("/home/notes/like", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var noteid = body.noteid;

    let notelikin = await notelike.findOne({ userid: user._id, noteid: noteid });

    //let questsp = await Quest.findOneAndUpdate({ _id: questid });
    if (notelikin === null) {
        if (notelikin === notelikin) {
            let _nlike = new notelike({
                userid: user._id,
                noteid: storyid,
                nlikestatus: true,
                nstatus: "valid",

            });
            await _nlike.save();
            await modelnotes.findOneAndUpdate({ _id: noteid }, {
                    $inc: {
                        nlikes: 1,
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
            let _nunlike = new notelike({
                userid: user._id,
                noteid: storyid,
                nlikestatus: true,
                nstatus: "valid",

            });
            await _nunlike.save();
            await modelnotes.findOneAndUpdate({ _id: noteid }, {
                    $dec: {
                        nlikes: 1,
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

        if (notelikin.nlikestatus === false) {
            await notelike.findOne({ userid: user._id, noteid: noteid }, {
                    $set: {
                        nlikestatus: true,
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

            await modelnotes.findOneAndUpdate({ _id: noteid }, {
                    $inc: {
                        nlikes: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response4 = {
                        message: "like updated",
                    };


                });

        } else {

            await notelike.findOne({ userid: user._id, noteid: noteid }, {
                    $set: {
                        nlikestatus: false,
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
            await modelnotes.findOneAndUpdate({ _id: noteid }, {
                    $dec: {
                        nlikes: 1,
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








router.get("/search/:searchtext", userAuth, async(req, res) => {
    try {
        let { user, file } = req;
        var max = 10;
        const page = parseInt(req.query.page)
        const limit = parseInt(max)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}

        if (endIndex < await modelnotes.countDocuments().exec()) {
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
        let topicresults = await modelnotes.find({ $or: [{ ntitle: regexv }, { ncat: regexv }, { ndescriptions: regexv }] }).populate("userid", "profileid").populate({
            path: 'userid',
            select: 'profileid',
            populate: { path: 'profileid', select: 'name avatar ispopular' }
        }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
        if (!topicresults) {
            return res.status(404).json({
                success: false,
                message: "not available.",
            });
        }
        return res.status(201).json({
            topicresults,
            success: true,
            message: " available.",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Unable to get the profile.",
        });
    }
});








router.get("/searchnotes/:searchtext", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await modelnoteschaps.countDocuments().exec()) {
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
    let topicresults = await modelnoteschaps.find({ $or: [{ nctitle: regexv }, { nccat: regexv }, { ncdescriptions: regexv }] }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
    if (!topicresults) {
        return res.status(404).json({
            success: false,
            message: "no  available.",
        });
    }
    return res.status(201).json({
        topicresults,
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










router.post("/home/notes/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var noteid = body.noteid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var storyviu = await modelnotes.findOneAndUpdate({ _id: noteid }, {
            $inc: {
                nread: 1,
            },
        },
        async(err, storyviu) => {
            if (err) return res.status(501).send(err);
            const response = {
                message: "view updated",
                status: true
                    //quest: questviu
            };
            if (storyviu) {
                return res.status(201).json({
                    message: "view updated",
                    status: true
                });
            }
            return res.status(404).json({
                message: "no view updated",
                status: false
            });
        });
    // } catch (err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Unable to get the profile.",
    //     });
    // }
});






router.get(
    "/comment/:noteid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var noteid = req.params.noteid;
        if (!noteid) {
            return res.status(404).json({
                success: false,
                message: "Your comments not found.",
            });
        } else {
            let comments = await notechapcomment.find({ notechapid: req.params.noteid }).populate("userid", "profileid").populate({
                path: 'userid',
                select: 'profileid',
                populate: { path: 'profileid', select: 'name avatar ispopular' }
            }).sort({ "createdAt": -1 });
            return res.status(200).json({
                comments,
                success: true,
                message: "Your comment found.",
            });
        }
    }
);











router.get(
    "/comments/:noteid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var noteid = req.params.noteid;
        if (!noteid) {
            return res.status(404).json({
                success: false,
                message: "Your comments not found.",
            });
        } else {
            let comment = await notecomment.find({ noteid: req.params.noteid }).populate("userid", "profileid").populate({
                path: 'userid',
                select: 'profileid',
                populate: { path: 'profileid', select: 'name avatar ispopular' }
            }).sort({ "createdAt": -1 });
            return res.status(200).json({
                comment,
                success: true,
                message: "Your comment found.",
            });
        }
    }
);


export default router;