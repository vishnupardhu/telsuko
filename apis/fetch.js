import { Router } from "express";
import { DOMAIN } from "../constants/index.js";


import User from "../models/User.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";

import Quest from "../models/question/quest.js";
import Questlike from "../models/question/questlike.js";

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
router.post(
    "/api/quests/upload",
    userAuth,
    uploader.single("quest"),
    async(req, res) => {
        try {
            let { file } = req;
            let filename = file.filename;
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

/**
 * @description To create a new post by the authenticated User
 * @api /posts/api/create-post
 * @access private
 * @type POST
 */
router.post(
    "/quest/create-mcq5",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype5 = "Mcq-5";
        if (body) {
            if (!file) {
                console.log(req.body);

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype5,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
                    qopt1: body.qopt3,
                    qopt1: body.qopt4,
                    qopt1: body.qopt5,
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
                image = DOMAIN + "/" + new Date().getTime() + "-" + file.filename;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype5,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
                    qopt1: body.qopt3,
                    qopt1: body.qopt4,
                    qopt1: body.qopt5,
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
    "/quest/create-mcq4",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype4 = "Mcq-4";
        if (body) {
            if (!file) {
                console.log(req.body);

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype4,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
                    qopt1: body.qopt3,
                    qopt1: body.qopt4,
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
                image = DOMAIN + "/" + new Date().getTime() + "-" + file.filename;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype4,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
                    qopt1: body.qopt3,
                    qopt1: body.qopt4,
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
    "/quest/create-mcq3",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype3 = "Mcq-3";
        if (body) {
            if (!file) {
                console.log(req.body);

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype3,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
                    qopt1: body.qopt3,
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
                image = DOMAIN + "/" + new Date().getTime() + "-" + file.filename;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype3,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
                    qopt1: body.qopt3,
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
    "/quest/create-mcq2",
    uploader.single("qmedia"),
    userAuth,
    async(req, res) => {
        // try {
        // Create a new Post
        let { body, user, file } = req;
        var image, image1 = "";
        var qtype2 = "Mcq-2";
        if (body) {
            if (!file) {
                console.log(req.body);

                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype2,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
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
                image = DOMAIN + "/" + new Date().getTime() + "-" + file.filename;
                let quest = new Quest({
                    userid: user._id,
                    qtitle: body.qtitle,
                    qcategory: body.qcategory,
                    qsubcat: body.qsubcat,
                    qtype: qtype2,
                    qpositive: body.qpositive,
                    qnegative: body.qnegative,
                    qopt1: body.qopt1,
                    qopt1: body.qopt2,
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
 * @description To update a post by the authenticated User
 * @api /posts/api/upadte-post
 * @access private
 * @type PUT
 */
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
    "/quest/create-blank",
    uploader.single("qmedia"),
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
                image = DOMAIN + "/" + new Date().getTime() + "-" + file.filename;
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

export default router;