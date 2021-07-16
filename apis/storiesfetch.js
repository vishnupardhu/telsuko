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


import storychapcomment from "../models/storiesmodel/stories-chapter-model-comment.js";
import storychaplike from "../models/storiesmodel/stories-chapter-model-like.js";
import storylike from "../models/storiesmodel/stories-model-like.js";
import storycomment from "../models/storiesmodel/stories-model-comment.js";








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
router.get("/chapters", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await modelstorychaps.countDocuments().exec()) {
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

    let stories = await modelstorychaps.find({
        scstatus: "published"
    }).populate('storiesref').populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
    if (!stories) {
        return res.status(404).json({
            success: false,
            message: "no quests available.",
        });
    }
    return res.status(200).json({
        stories,
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


router.get("/fetch/story", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let newstories = await modelstories.find().populate("userid", "profileid").populate({
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


router.get("/fetch/homestory", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let newstories = await modelstories.find({ storystatus: "published" }).populate("userid", "profileid").populate({
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
router.get("/fetch/homestory/:storyid", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    let homestoriesview = await modelstories.findById({
        _id: req.params.storyid,
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!homestoriesview) {
        return res.status(404).json({
            success: false,
            message: "no notes chapter available.",
        });
    }
    return res.status(200).json({
        homestoriesview,
        success: true,
        message: "notes chapter available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});
router.get("/homestory/chapters/", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;

    let homestoriespubchaps = await modelstorychaps.find({
        scstatus: "published"
    }).populate('storiesref').populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!homestoriespubchaps) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        homestoriespubchaps,
        success: true,
        message: "stories available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});
router.get("/fetch/homestory/chapters/", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;

    let homestoriespubchaps = await modelstorychaps.find({
        scstatus: "published"
    }).populate('storiesref').populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!homestoriespubchaps) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        homestoriespubchaps,
        success: true,
        message: "stories available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});
router.get("/fetch/mystory/unpublished", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let storiesunpub = await modelstories.find({
        userid: user._id,
        storystatus: "unpublished"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!storiesunpub) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        storiesunpub,
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

router.get("/fetch/mystory/published", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    let storiespub = await modelstories.find({
        userid: user._id,
        storystatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 });
    if (!storiespub) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        storiespub,
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



router.get("/fetch/story/getchapters/:storyid", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;

    let allstoriespubchaps = await modelstorychaps.find({
        storiesref: req.params.storyid,
        scstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!allstoriespubchaps) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        allstoriespubchaps,
        success: true,
        message: "stories available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});
router.get("/fetch/mystory/chapters/:storyid", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;

    let storiespubchaps = await modelstorychaps.find({
        userid: user._id,
        storiesref: req.params.storyid,
        scstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!storiespubchaps) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        storiespubchaps,
        success: true,
        message: "stories available.",
    });
    // } catch (err) {
    //     console.log("ERR", err.message);
    //     //return res.sendFile(join(__dirname, "../templates/errors.html"));
    // }
});
router.post("/fetch/mystory/chapters", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var mystoryid = body.storyid;
    let storiespubchaps = await modelstorychaps.find({
        userid: user._id,
        storiesref: mystoryid,
        scstatus: "published"
    }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    });
    if (!storiespubchaps) {
        return res.status(404).json({
            success: false,
            message: "no stories available.",
        });
    }
    return res.status(200).json({
        storiespubchaps,
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




router.post("/homestories/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var noteid = body.noteid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var questviu = await modelstories.findOneAndUpdate({ _id: noteid }, {
            $inc: {
                storyread: 1,
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
router.post("/homestories/chapter/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var storyid = body.storyid;

    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var storychapviu = await modelstorychaps.findOneAndUpdate({ _id: storyid }, {
            $inc: {
                scread: 1,
            },
        },
        async(err, storychapviu) => {
            if (err) return res.status(501).send(err);
            const response = {
                message: "view updated",
                success: true,
            };
            if (storychapviu) {
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
/**
 * @description To create a new post by the authenticated User
 * @api /posts/api/create-post
 * @access private
 * @type POST
 */

router.post("/home/story/chapter/like", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var storylikeid = body.storyid;
    var storylikeidstatus = body.storylikestatus;
    let storylikein = await storychaplike.findOne({ userid: user._id, storychapid: storylikeid });

    //let questsp = await Quest.findOneAndUpdate({ _id: questid });
    if (storylikein === null) {
        if (storylikein === storylikein) {
            let _sclike = new storychaplike({
                userid: user._id,
                storychapid: storylikeid,
                sclikestatus: true,
                scstatus: "valid",

            });
            await _sclike.save();
            await modelstorychaps.findOneAndUpdate({ _id: storylikeid }, {
                    $inc: {
                        sclikes: 1,
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
            let _scunlike = new storychaplike({
                userid: user._id,
                storychapid: storylikeid,
                sclikestatus: false,
                scstatus: "valid",

            });
            await _scunlike.save();
            await modelstorychaps.findOneAndUpdate({ _id: storylikeid }, {
                    $inc: {
                        sclikes: -1,
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

        if (storylikein.scstatus === false) {
            await storychaplike.findOneAndUpdate({ userid: user._id, storychapid: storylikeid }, {
                    $set: {
                        sclikestatus: true,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response3 = {
                        message: "like updated",
                    };

                    return res.status(201).json({
                        message: "like updated",
                    });
                });

            await modelstorychaps.findOneAndUpdate({ _id: storylikeid }, {
                    $inc: {
                        sclikes: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response4 = {
                        message: "like updated",
                    };


                });

        } else {

            await storychaplike.findOneAndUpdate({ userid: user._id, storychapid: storylikeid }, {
                    $set: {
                        sclikestatus: false,
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
            await modelstorychaps.findOneAndUpdate({ _id: storylikeid }, {
                    $inc: {
                        sclikes: -1,
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


router.post("/home/story/chapter/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var storyid = body.storyid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var storychapviu = await modelstorychaps.findOneAndUpdate({ _id: storyid }, {
            $inc: {
                scread: 1,
            },
        },
        async(err, storychapviu) => {
            if (err) return res.status(501).send(err);
            const response = {
                message: "view updated",
                quest: storychapviu
            };
            if (storychapviu) {
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

router.post("/home/story/like", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var storyid = body.storyid;

    let storylikin = await storylike.findOne({ userid: user._id, storyid: storyid });

    //let questsp = await Quest.findOneAndUpdate({ _id: questid });
    if (storylikin === null) {
        if (storylikin === storylikin) {
            let _slike = new storylike({
                userid: user._id,
                storyid: storyid,
                slikestatus: true,
                sstatus: "valid",

            });
            await _slike.save();
            await modelstories.findOneAndUpdate({ _id: storyid }, {
                    $inc: {
                        storylikes: 1,
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
            let _sunlike = new storylike({
                userid: user._id,
                storyid: storyid,
                slikestatus: false,
                sstatus: "valid",

            });
            await _sunlike.save();
            await modelstories.findOneAndUpdate({ _id: storyid }, {
                    $inc: {
                        storylikes: -1,
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

        if (storylikin.sstatus === false) {
            await storylike.findOne({ userid: user._id, storyid: storyid }, {
                    $set: {
                        slikestatus: true,
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

            await modelstories.findOneAndUpdate({ _id: storyid }, {
                    $inc: {
                        storylikes: 1,
                    },
                },
                async(err, profile) => {
                    if (err) return res.status(501).send(err);
                    const response4 = {
                        message: "like updated",
                    };


                });

        } else {

            await storylike.findOne({ userid: user._id, storyid: storyid }, {
                    $set: {
                        slikestatus: false,
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
            await modelstories.findOneAndUpdate({ _id: storyid }, {
                    $inc: {
                        storylikes: -1,
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

router.get("/search/:searchterm", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await modelstories.countDocuments().exec()) {
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
    let quests = await modelstories.find({ $or: [{ storytitle: regexv }, { storygenere: regexv }, { storydescriptions: regexv }, { storysubgenere: regexv }, { storymentions: regexv }] }).populate("userid", "profileid").populate({
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
router.get("/searchstory/:searchterm", userAuth, async(req, res) => {
    // try {
    let { user, file } = req;
    var max = 10;
    const page = parseInt(req.query.page)
    const limit = parseInt(max)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < await modelstorychaps.countDocuments().exec()) {
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
    let storyresults = await modelstorychaps.find({ $or: [{ sctitle: regexv }, { scgenere: regexv }, { scdescriptions: regexv }] }).populate("userid", "profileid").populate({
        path: 'userid',
        select: 'profileid',
        populate: { path: 'profileid', select: 'name avatar ispopular' }
    }).sort({ "createdAt": -1 }).limit(limit).skip(startIndex).exec();
    if (!storyresults) {
        return res.status(404).json({
            success: false,
            message: "not  available.",
        });
    }
    return res.status(200).json({
        storyresults,
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
router.post("/home/story/view", userAuth, async(req, res) => {
    // try {
    let { body, user, file } = req;
    var storyid = body.storyid;
    //console.log(req.body);
    //let questsp = await Quest.findOneAndUpdate({ _id: questid });

    var storyviu = await modelstories.findOneAndUpdate({ _id: storyid }, {
            $inc: {
                storyread: 1,
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
    "/comment/:storyid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var storyid = req.params.storyid;
        if (!storyid) {
            return res.status(404).json({
                success: false,
                message: "Your comments not found.",
            });
        } else {
            let comments = await storychapcomment.find({ storychapid: req.params.storyid }).populate("userid", "profileid").populate({
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
    "/comments/:storyid",
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var storyid = req.params.storyid;
        if (!storyid) {
            return res.status(404).json({
                success: false,
                message: "Your comments not found.",
            });
        } else {
            let comments = await storycomment.find({ storyid: req.params.storyid }).populate("userid", "profileid").populate({
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
export default router;