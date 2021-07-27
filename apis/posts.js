import Router from "express";
import { DOMAIN } from "../constants/index.js";

import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";
// const Post = require("../models/Post.js");
// const User = require("../models/User.js");
// const Profile = require("../models/Profile.js");


import Quest from "../models/question/quest.js";
import Questlike from "../models/question/questlike.js";

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
import { uploadexplanmedia, uploadquestmedia } from "../middlewares/uploader.js";
const router = Router();




/**
 * @description To Upload Post Image
 * @api /posts/api/post-image-upload
 * @access private
 * @type POST
 */
router.post(
    "/api/quests/upload",
    userAuth,
    uploader,
    async(req, res) => {
        try {
            let { file } = req;
            image = req.files.qmedia[0];
            image1 = req.files.emedia[0];
            return res.status(200).json({
                filename,
                success: true,
                message: "Image Uploaded Successfully.",
            });
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: "Unable to create the post.",
            });
        }
    }
);

/**
 * @description To create a new post by the authenticated User
 * @api /posts/api/create-post
 * @access private
 * @type POST
 */
router.post(
    "/quest/create/mcq5",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "";
        var qtype5 = "Mcq-5";
        var qsubcs = "";
        if (body) {
            if (body.qmedia === "") {
                if (body.emedia === "") {
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
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
                        qexpmedia: "",
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
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
                        qexpmedia: image1,
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            } else {
                if (body.emedia === "") {
                    image = req.files.qmedia[0];
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
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
                        qexpmedia: "",
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {
                    image = req.files.qmedia[0].location;
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
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
                        qexpmedia: image1,
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            }

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq5/type4",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype5 = "Mcq-5";
        var qsubcs = "";
        if (body) {

            image = req.files.qmedia[0].location;
            image1 = req.files.emedia[0].location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
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
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });


        } else {
            return res.status(404).json({
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
    "/quest/create/mcq5/type1",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype5 = "Mcq-5";
        var qsubcs = "";
        if (body) {
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
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
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq5/type2",
    userAuth,
    uploadquestmedia.single("qmedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;

        var image = "",
            image1 = "noimage";
        var qtype5 = "Mcq-5";
        var qsubcs = "";
        if (body) {

            image = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
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
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq5/type3",
    userAuth,
    uploadexplanmedia.single("emedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype5 = "Mcq-5";
        var qsubcs = "";
        if (body) {

            image1 = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
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
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    userAuth,
    uploader,

    //  uploader.fields([{ name: 'qmedia', maxCount: 10 }, { name: 'explan', maxCount: 2 }]),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1, files } = req;
        //console.log(req.body, req.files, req.file.location, req.file.location);
        var image = "",
            image1 = "";
        var qtype4 = "Mcq-4";
        var qsubcs = "";
        if (body) {
            if (body.qmedia === "") {
                if (body.emedia === "") {

                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype4,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,
                        qopt4: body.qopt4,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype4,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,
                        qopt4: body.qopt4,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            } else {

                if (body.emedia === "") {


                    image = req.files.qmedia[0];
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype4,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,
                        qopt4: body.qopt4,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {

                    image = req.files.qmedia[0].location;
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype4,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,
                        qopt4: body.qopt4,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            }

        } else {


            return res.status(404).json({

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
    "/quest/create/mcq4/type4",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype4 = "Mcq-4";
        var qsubcs = "";
        if (body) {

            image = req.files.qmedia[0].location;
            image1 = req.files.emedia[0].location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype4,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,
                qopt4: body.qopt4,

                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq4/type1",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype4 = "Mcq-4";
        var qsubcs = "";
        if (body) {
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype4,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,
                qopt4: body.qopt4,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq4/type2",
    userAuth,
    uploadquestmedia.single("qmedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype4 = "Mcq-4";
        var qsubcs = "";
        if (body) {

            image = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype4,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,
                qopt4: body.qopt4,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq4/type3",
    userAuth,
    uploadexplanmedia.single("emedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype4 = "Mcq-4";
        var qsubcs = "";
        if (body) {

            image1 = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype4,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,
                qopt4: body.qopt4,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });


        } else {
            return res.status(404).json({
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
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "";
        var qtype3 = "Mcq-3";
        var qsubcs = "";
        if (body) {
            if (body.qmedia === "") {
                if (body.emedia === "") {
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype3,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,

                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype3,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }



            } else {

                if (body.emedia === "") {

                    image = req.files.qmedia[0];
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype3,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {

                    image = req.files.qmedia[0].location;
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype3,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qopt3: body.qopt3,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            }



        } else {


            return res.status(404).json({

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
    "/quest/create/mcq3/type4",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype3 = "Mcq-3";
        var qsubcs = "";
        if (body) {

            image = req.files.qmedia[0].location;
            image1 = req.files.emedia[0].location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype3,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,


                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq3/type1",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype3 = "Mcq-3";
        var qsubcs = "";
        if (body) {
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype3,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,

                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq3/type2",
    userAuth,
    uploadquestmedia.single("qmedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype3 = "Mcq-3";
        var qsubcs = "";
        if (body) {

            image = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype3,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,

                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq3/type3",
    userAuth,
    uploadexplanmedia.single("emedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype3 = "Mcq-3";
        var qsubcs = "";
        if (body) {

            image1 = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype3,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qopt3: body.qopt3,

                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });


        } else {
            return res.status(404).json({
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
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "";
        var qtype2 = "Mcq-2";
        var qsubcs = "";
        if (body) {
            if (body.qmedia === "") {
                if (body.emedia === "") {

                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype2,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,

                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype2,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,

                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }



            } else {

                if (body.emedia === "") {

                    image = req.files.qmedia[0];
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype2,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {

                    image = req.files.qmedia[0].location;
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype2,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qopt2: body.qopt2,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            }

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq2/type4",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype2 = "Mcq-2";
        var qsubcs = "";
        if (body) {

            image = req.files.qmedia[0].location;
            image1 = req.files.emedia[0].location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype2,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,



                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq2/type1",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype2 = "Mcq-2";
        var qsubcs = "";
        if (body) {
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype2,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,


                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq2/type2",
    userAuth,
    uploadquestmedia.single("qmedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype2 = "Mcq-2";
        var qsubcs = "";
        if (body) {

            image = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype2,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/mcq2/type3",
    userAuth,
    uploadexplanmedia.single("emedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "noimage";
        var qtype2 = "Mcq-2";
        var qsubcs = "";
        if (body) {

            image1 = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype2,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qopt2: body.qopt2,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });


        } else {
            return res.status(404).json({
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
    "/quest/create/blank",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "";
        var qtype1 = "Blank";
        var qsubcs = "";
        if (body) {
            if (body.qmedia === "") {
                if (body.emedia === "") {
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype1,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype1,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: "noimage",
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            } else {
                if (body.emedia === "") {
                    image = req.files.qmedia[0];
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype1,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,

                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: "",
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                } else {

                    image = req.files.qmedia[0].location;
                    image1 = req.files.emedia[0].location;
                    let quest = new Quest({
                        userid: user._id,
                        qtitle: body.qtitle,
                        qcategory: body.qcategory,
                        qsubcat: qsubcs,
                        qtype: qtype1,
                        qpositive: body.qpositive,
                        qnegative: body.qnegative,
                        qopt1: body.qopt1,
                        qans: body.qans,
                        qexp: body.qexp,
                        qexpmedia: image1,
                        qmedia: image,
                        qstatus: "valid",
                        qtitleslug: body.qtitle,
                    });
                    await quest.save();
                    return res.status(201).json({
                        quest,
                        success: true,
                        message: "Your quest is published.",
                    });
                }
            }

        } else {
            return res.status(404).json({
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
    "/quest/create/blank4",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "",
            image1 = "";
        var qtype1 = "Blank";
        var qsubcs = "";
        if (body) {

            image = req.files.qmedia[0].location;
            image1 = req.files.emedia[0].location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype1,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/blank1",
    userAuth,
    uploader,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "noimage",
            image1 = "";
        var qtype1 = "Blank";
        var qsubcs = "";

        if (body) {
            //console.log(body);
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype1,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/blank2",
    userAuth,
    uploadquestmedia.single("qmedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "noimage",
            image1 = "";
        var qtype1 = "Blank";
        var qsubcs = "";
        if (body) {

            image = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype1,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });

        } else {
            return res.status(404).json({
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
    "/quest/create/blank3",
    userAuth,
    uploadexplanmedia.single("emedia"),
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file, file1 } = req;
        var image = "noimage",
            image1 = "";
        var qtype1 = "Blank";
        var qsubcs = "";
        if (body) {

            image1 = req.file.location;
            let quest = new Quest({
                userid: user._id,
                qtitle: body.qtitle,
                qcategory: body.qcategory,
                qsubcat: qsubcs,
                qtype: qtype1,
                qpositive: body.qpositive,
                qnegative: body.qnegative,
                qopt1: body.qopt1,
                qans: body.qans,
                qexp: body.qexp,
                qexpmedia: image1,
                qmedia: image,
                qstatus: "valid",
                qtitleslug: body.qtitle,
            });
            await quest.save();
            return res.status(201).json({
                quest,
                success: true,
                message: "Your quest is published.",
            });


        } else {
            return res.status(404).json({
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
        return res.status(404).json({
            success: false,
            message: "Unable to like the post. Please try again later.",
        });
    }
});



export default router;