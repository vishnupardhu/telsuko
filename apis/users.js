import {
    ResetPassword,
    RegisterValidations,
    AuthenticateValidations,
} from "../validators/index.js";
import { join } from "path";
import User from "../models/User.js";
import { Router } from "express";
import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";
import { DOMAIN } from "../constants/index.js";
import sendMail from "../functions/email-sender.js";
import { userAuth } from "../middlewares/auth-guard.js";
import Validator from "../middlewares/validator-middleware.js";

const router = Router();












router.post(
    "/api/register",
    RegisterValidations,
    Validator,
    async(req, res) => {
        // try {
        let { username, email } = req.body;
        // Check if the username is taken or not
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken.",
            });
        }
        // Check if the user exists with that email
        let userlogic = await User.findOne({ email: req.body.email });
        if (userlogic) {
            return res.status(404).json({
                success: false,
                message: "Email is already registered. Did you forget the password. Try resetting it.",
            });
        }
        let usernew = new User({

            ...req.body,
            verificationCode: randomBytes(20).toString("hex"),
        });
        await usernew.save();
        // Send the email to the user with a varification link
        let html = `
        <div>
            <h1>Hello, ${usernew.username}</h1>
            <p>Please click the following link to verify your account</p>
            <a href="${DOMAIN}/users/verify-now/${usernew.verificationCode}">Verify Now</a>
        </div>
    `;
        await sendMail(
            usernew.email,
            "Verify Account",
            "Please verify Your Account.",
            html
        );
        return res.status(201).json({
            success: true,
            message: "Hurray! your account is created please verify your email address.",
        });
        // } catch (err) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "Server busy.",
        //     });
        // }
    }
);











router.post(
    "/api/register/signup",
    RegisterValidations,
    Validator,
    async(req, res) => {
        // try {


        // Check if the username is taken or not
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken.",
            });
        }
        // Check if the user exists with that email
        let userlogic = await User.findOne({ email: req.body.email });
        if (userlogic) {
            return res.status(404).json({
                success: false,
                message: "Email is already registered. Did you forget the password. Try resetting it.",
            });
        }
        let usernew = new User({

            ...req.body,
            verificationCode: randomBytes(20).toString("hex"),
        });
        await usernew.save();
        // Send the email to the user with a varification link
        let html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width" name="viewport"/>
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-->
        <!--<![endif]-->
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                }
        
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                }
        
                * {
                    line-height: inherit;
                }
        
                a[x-apple-data-detectors=true] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
            </style>
            <style  type="text/css">
        .fa {
          padding: 20px;
          font-size: 30px;
          width: 50px;
          text-align: center;
          text-decoration: none;
          margin: 5px 2px;
        }
        
        .fa:hover {
            opacity: 0.7;
        }
        
        .fa-facebook {
          background: #3B5998;
          color: white;
        }
        
        .fa-twitter {
          background: #55ACEE;
          color: white;
        }
        
        .fa-google {
          background: #dd4b39;
          color: white;
        }
        
        .fa-linkedin {
          background: #007bb5;
          color: white;
        }
        
        .fa-youtube {
          background: #bb0000;
          color: white;
        }
        
        .fa-instagram {
          background: #125688;
          color: white;
        }
        
        .fa-pinterest {
          background: #cb2027;
          color: white;
        }
        
        .fa-snapchat-ghost {
          background: #fffc00;
          color: white;
          text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        }
        
        .fa-skype {
          background: #00aff0;
          color: white;
        }
        
        .fa-android {
          background: #a4c639;
          color: white;
        }
        
        .fa-dribbble {
          background: #ea4c89;
          color: white;
        }
        
        .fa-vimeo {
          background: #45bbff;
          color: white;
        }
        
        .fa-tumblr {
          background: #2c4762;
          color: white;
        }
        
        .fa-vine {
          background: #00b489;
          color: white;
        }
        
        .fa-foursquare {
          background: #45bbff;
          color: white;
        }
        
        .fa-stumbleupon {
          background: #eb4924;
          color: white;
        }
        
        .fa-flickr {
          background: #f40083;
          color: white;
        }
        
        .fa-yahoo {
          background: #430297;
          color: white;
        }
        
        .fa-soundcloud {
          background: #ff5500;
          color: white;
        }
        
        .fa-reddit {
          background: #ff5700;
          color: white;
        }
        
        .fa-rss {
          background: #ff6600;
          color: white;
        }
        </style>
        <style id="media-query" type="text/css">
                @media (max-width: 620px) {
        
                    .block-grid,
                    .col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
        
                    .block-grid {
                        width: 100% !important;
                    }
        
                    .col {
                        width: 100% !important;
                    }
        
                    .col_cont {
                        margin: 0 auto;
                    }
        
                    img.fullwidth,
                    img.fullwidthOnMobile {
                        width: 100% !important;
                    }
        
                    .no-stack .col {
                        min-width: 0 !important;
                        display: table-cell !important;
                    }
        
                    .no-stack.two-up .col {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num2 {
                        width: 16.6% !important;
                    }
        
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
        
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
        
                    .no-stack .col.num5 {
                        width: 41.6% !important;
                    }
        
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num7 {
                        width: 58.3% !important;
                    }
        
                    .no-stack .col.num8 {
                        width: 66.6% !important;
                    }
        
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
        
                    .no-stack .col.num10 {
                        width: 83.3% !important;
                    }
        
                    .video-block {
                        max-width: none !important;
                    }
        
                    .mobile_hide {
                        min-height: 0px;
                        max-height: 0px;
                        max-width: 0px;
                        display: none;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide {
                        display: block !important;
                        max-height: none !important;
                    }
                }
            </style>
        <style id="icon-media-query" type="text/css">
                @media (max-width: 620px) {
                    .icons-inner {
                        text-align: center;
                    }
        
                    .icons-inner td {
                        margin: 0 auto;
                    }
                }
            </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #faf3e1;">
        <!--[if IE]><div class="ie-browser"><![endif]-->
        <table bgcolor="#faf3e1" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #faf3e1; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#faf3e1"><![endif]-->
        <div style="background-color:transparent;">
        <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 25px; padding-right: 25px; padding-bottom: 25px; padding-left: 25px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 11px solid #F8D995; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #FFFFFF;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 30px; padding-top: 10px; padding-bottom: 5px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:5px;padding-left:30px;">
        <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
        <p style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><strong><span style="font-size: 24px;">Hello, ${usernew.username}</span></strong></p>
        <p style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;"><span style="font-size: 14px;">Please click on the button to complete the verification process for Your Email</span></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <div align="left" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:30px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 30px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:25.5pt;width:165pt;v-text-anchor:middle;" arcsize="9%" stroke="false" fillcolor="#F8D995"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:12px"><![endif]-->
        <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#F8D995;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;width:auto; width:auto;;border-top:1px solid #F8D995;border-right:1px solid #F8D995;border-bottom:1px solid #F8D995;border-left:1px solid #F8D995;padding-top:5px;padding-bottom:5px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:12px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 12px; line-height: 2; word-break: break-word; mso-line-height-alt: 24px;"> <a href="${DOMAIN}/users/verify-now/${usernew.verificationCode}">VERIFY YOUR EMAIL ADDRESS</a><br/></span></span></div>
        <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
        </div>
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #EDEDED;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#EDEDED;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#EDEDED"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#EDEDED;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.8;padding-top:30px;padding-right:30px;padding-bottom:30px;padding-left:30px;">
        <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.8; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 22px;">
        <p style="margin: 0; font-size: 14px; line-height: 1.8; word-break: break-word; mso-line-height-alt: 25px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;">If you didn't attempt to verify your email address with our service, delete this email.</span></p>
        <p style="margin: 0; font-size: 14px; line-height: 1.8; word-break: break-word; mso-line-height-alt: 25px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;">Cheers</span></p>
        
        <p style="margin: 0; font-size: 12px; line-height: 1.8; word-break: break-word; mso-line-height-alt: 22px; margin-top: 0; margin-bottom: 0;"><em><strong><span style="font-size: 14px;">Team Telsuko.com</span></strong></em></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid three-up" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #BBBBBB;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#BBBBBB;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#BBBBBB"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="200" style="background-color:#BBBBBB;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 200px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#BBBBBB;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 200px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <div align="center" class="img-container center" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#FFFFFF;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #FFFFFF; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
        <p style="margin: 0; font-size: 14px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;"><strong>support@telsuko.com</strong></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#BBBBBB;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 200px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
        <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
        <tbody>
        <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
        <td >
        <a href="
        https://www.facebook.com/IAmTelsuko" class="fa fa-facebook"></a></td>
        <td >
        <a href="
        https://twitter.com/IAmTelsuko" class="fa fa-twitter"></a>
        </td>
        <td >
        <a href="https://www.youtube.com/channel/UCmZ-Gc8yoKeLyIHbt162Z8w" class="fa fa-youtube"></a>
        </td>
        <td >
        <a href="www.linkedin.com/in/telsuko" class="fa fa-linkedin"></a>
        </td>
        <td >
        <a href="https://www.instagram.com/iamtelsuko/" class="fa fa-instagram"></a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#FFFFFF;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #FFFFFF; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
        <p style="margin: 0; font-size: 12px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 14px; margin-top: 0; margin-bottom: 0;"><strong><span style="font-size: 14px;">We Are Social</span></strong><br/></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div style="background-color:transparent;">
        <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tr style="vertical-align: top;" valign="top">
        <td align="center" style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 0px; padding-bottom: 5px; padding-left: 0px; text-align: center;" valign="top">
        <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
        <!--[if !vml]><!-->
        <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" valign="top">
        <!--<![endif]-->
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined;" valign="middle"><a href="https://www.Telsuko.com/" style="color:#9d9d9d;text-decoration:none;">Telsuko.com</a></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (IE)]></div><![endif]-->
        </body>
        </html>
    `;
        await sendMail(
            usernew.email,
            "Verify Account",
            "Please verify Your Account.",
            html
        );
        return res.status(201).json({
            success: true,
            message: "Hurray! your account is created please verify your email address.",
        });
        // } catch (err) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "Server busy.",
        //     });
        // }
    }
);


router.get("/checkusername/:username", async(req, res) => {
    try {
        User.findOne({ username: req.params.username }, (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            if (result !== null) {
                return res.json({
                    Status: true,
                });
            } else
                return res.json({
                    Status: false,
                });
        });
    } catch (err) {
        console.log("ERR", err.message);

    }
});





router.get("/checkuseremail/:email", async(req, res) => {
    try {
        User.findOne({ email: req.params.email }, (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            if (result !== null) {
                return res.json({
                    Status: true,
                });
            } else
                return res.json({
                    Status: false,
                });
        });
    } catch (err) {
        console.log("ERR", err.message);
        //return res.sendFile(join(__dirname, "../templates/errors.html"));
    }
});




router.get("/checkprofilestatus/:_id", async(req, res) => {
    try {
        User.findOne({ _id: req.params.profileid }, (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            if (result.isProfileverified !== false) {
                return res.json({
                    Status: true,
                });
            } else
                return res.json({
                    Status: false,
                });
        });
    } catch (err) {
        console.log("ERR", err.message);

    }
});




router.get("/verify-now/:verificationCode", async(req, res) => {
    try {
        let { verificationCode } = req.params;
        let user = await User.findOne({ verificationCode });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Invalid verification code.",
            });
        }
        user.verified = true;
        user.verificationCode = undefined;
        await user.save();
        return res.sendFile(
            join(__dirname, "../templates/verification-success.html")
        );
    } catch (err) {
        console.log("ERR", err.message);
        return res.sendFile(join(__dirname, "../templates/errors.html"));
    }
});





router.post(
    "/api/login",
    AuthenticateValidations,
    Validator,
    async(req, res) => {
        try {

            let { email, passwordu } = req.body;
            let isverified = true;
            let paassword = hash(req.body.password, 10);
            User.findOne({ email: req.body.email }, async(err, result) => {
                if (err) return res.status(500).json({ msg: err });
                if (result === null) {
                    return res.status(403).json("Email incorrect or may not Exists");
                }
                if (!(result.verified === isverified)) {

                    res.status(403).json("Your Email is not verified ..Please verify it");
                } else {

                    compare(req.body.password, result.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            let token = user.generateJWT();
                            if (!(result.isProfileverified === isverified)) {
                                return res.status(401).json({

                                    success: false,

                                    token: `Bearer ${token}`,
                                    message: "welcome...!",
                                });
                            } else {
                                return res.status(201).json({
                                    success: false,

                                    token: `Bearer ${token}`,
                                    message: "logged in",
                                });
                            }

                        } else {
                            res.status(401).json("password is incorrect");
                        }
                    });
                }

            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err,
            });
        }
    }
);

router.post(
    "/api/authenticate",
    AuthenticateValidations,
    Validator,
    async(req, res) => {
        try {
            let { email, password } = req.body;
            let isverified = true;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email not found.",
                });
            }
            let vis = user.isprofileverified;
            if (user.verified != isverified) {
                // here we implement the JWT token functionality
                res.status(403).json({
                    success: false,
                    message: "Your Email is not verified ..Please verify it",
                });
            } else {
                compare(req.body.password, user.password, async(err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        let token = await user.generateJWT();
                        let isver = true;
                        if (vis != isver) {
                            return res.status(200).json({
                                success: false,
                                user: user.getUserInfo(),
                                token: `Bearer ${token}`,
                                message: "welcome...!",
                            });
                        } else {
                            return res.status(201).json({
                                success: false,
                                user: user.getUserInfo(),
                                token: `Bearer ${token}`,
                                message: "logged in",
                            });
                        }

                    } else {
                        res.status(401).json({
                            success: false,
                            message: "password is incorrect...",
                        });
                    }
                });
            }


        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    }
);





router.get("/api/authenticate", userAuth, async(req, res) => {
    return res.status(200).json({
        user: req.user,
        status: true
    });
});





router.post(
    "/api/reset-password",
    ResetPassword,

    async(req, res) => {
        // try {

        let user = await User.findOne({ email: req.body.email });
        if (user === null) {
            return res.status(404).json({
                success: false,
                message: "User with the email is not found.",
            });
        }
        user.generatePasswordReset();
        await user.save();
        // Sent the password reset Link in the email.
        let html = `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
            <head>
            <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
            <meta content="width=device-width" name="viewport"/>
            <!--[if !mso]><!-->
            <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <!--<![endif]-->
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <style type="text/css">
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }
            
                    * {
                        line-height: inherit;
                    }
            
                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
                <style  type="text/css">
            .fa {
              padding: 20px;
              font-size: 30px;
              width: 50px;
              text-align: center;
              text-decoration: none;
              margin: 5px 2px;
            }
            
            .fa:hover {
                opacity: 0.7;
            }
            
            .fa-facebook {
              background: #3B5998;
              color: white;
            }
            
            .fa-twitter {
              background: #55ACEE;
              color: white;
            }
            
            .fa-google {
              background: #dd4b39;
              color: white;
            }
            
            .fa-linkedin {
              background: #007bb5;
              color: white;
            }
            
            .fa-youtube {
              background: #bb0000;
              color: white;
            }
            
            .fa-instagram {
              background: #125688;
              color: white;
            }
            
            .fa-pinterest {
              background: #cb2027;
              color: white;
            }
            
            .fa-snapchat-ghost {
              background: #fffc00;
              color: white;
              text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
            }
            
            .fa-skype {
              background: #00aff0;
              color: white;
            }
            
            .fa-android {
              background: #a4c639;
              color: white;
            }
            
            .fa-dribbble {
              background: #ea4c89;
              color: white;
            }
            
            .fa-vimeo {
              background: #45bbff;
              color: white;
            }
            
            .fa-tumblr {
              background: #2c4762;
              color: white;
            }
            
            .fa-vine {
              background: #00b489;
              color: white;
            }
            
            .fa-foursquare {
              background: #45bbff;
              color: white;
            }
            
            .fa-stumbleupon {
              background: #eb4924;
              color: white;
            }
            
            .fa-flickr {
              background: #f40083;
              color: white;
            }
            
            .fa-yahoo {
              background: #430297;
              color: white;
            }
            
            .fa-soundcloud {
              background: #ff5500;
              color: white;
            }
            
            .fa-reddit {
              background: #ff5700;
              color: white;
            }
            
            .fa-rss {
              background: #ff6600;
              color: white;
            }
            </style>
            <style id="media-query" type="text/css">
                    @media (max-width: 620px) {
            
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }
            
                        .block-grid {
                            width: 100% !important;
                        }
            
                        .col {
                            width: 100% !important;
                        }
            
                        .col_cont {
                            margin: 0 auto;
                        }
            
                        img.fullwidth,
                        img.fullwidthOnMobile {
                            width: 100% !important;
                        }
            
                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }
            
                        .no-stack.two-up .col {
                            width: 50% !important;
                        }
            
                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }
            
                        .no-stack .col.num3 {
                            width: 25% !important;
                        }
            
                        .no-stack .col.num4 {
                            width: 33% !important;
                        }
            
                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }
            
                        .no-stack .col.num6 {
                            width: 50% !important;
                        }
            
                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }
            
                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }
            
                        .no-stack .col.num9 {
                            width: 75% !important;
                        }
            
                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }
            
                        .video-block {
                            max-width: none !important;
                        }
            
                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }
            
                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
            <style id="icon-media-query" type="text/css">
                    @media (max-width: 620px) {
                        .icons-inner {
                            text-align: center;
                        }
            
                        .icons-inner td {
                            margin: 0 auto;
                        }
                    }
                </style>
            </head>
            <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #faf3e1;">
            <!--[if IE]><div class="ie-browser"><![endif]-->
            <table bgcolor="#faf3e1" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #faf3e1; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top;" valign="top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#faf3e1"><![endif]-->
            <div style="background-color:transparent;">
            <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 25px; padding-right: 25px; padding-bottom: 25px; padding-left: 25px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 11px solid #F8D995; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>
            <div style="background-color:transparent;">
            <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #FFFFFF;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 30px; padding-top: 10px; padding-bottom: 5px; font-family: Arial, sans-serif"><![endif]-->
            <div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:5px;padding-left:30px;">
            <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><strong><span style="font-size: 24px;">Hello, ${user.username}</span></strong></p>
            <p style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;"><span style="font-size: 14px;">Please click the following link to reset your password...</span></span></p>
            <p style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;"><span style="font-size: 14px;">If this password reset not Requested by you, then you can ignore this email...</span></span></p>
            </div>
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
            <div align="left" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:30px;">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 30px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:25.5pt;width:165pt;v-text-anchor:middle;" arcsize="9%" stroke="false" fillcolor="#F8D995"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:12px"><![endif]-->
            <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#F8D995;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;width:auto; width:auto;;border-top:1px solid #F8D995;border-right:1px solid #F8D995;border-bottom:1px solid #F8D995;border-left:1px solid #F8D995;padding-top:5px;padding-bottom:5px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:12px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 12px; line-height: 2; word-break: break-word; mso-line-height-alt: 24px;"> <a href="${DOMAIN}/users/reset-password-now/${user.resetPasswordToken}">Reset Paasword Here</a><br/></span></span></div>
            <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
            </div>
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>
            <div style="background-color:transparent;">
            <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #EDEDED;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#EDEDED;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#EDEDED"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#EDEDED;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
            <div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.8;padding-top:30px;padding-right:30px;padding-bottom:30px;padding-left:30px;">
            <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.8; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 22px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.8; word-break: break-word; mso-line-height-alt: 25px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;">If you didn't attempt to verify your email address with our service, delete this email.</span></p>
            <p style="margin: 0; font-size: 14px; line-height: 1.8; word-break: break-word; mso-line-height-alt: 25px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;">Cheers</span></p>
            
            <p style="margin: 0; font-size: 12px; line-height: 1.8; word-break: break-word; mso-line-height-alt: 22px; margin-top: 0; margin-bottom: 0;"><em><strong><span style="font-size: 14px;">Team Telsuko.com</span></strong></em></p>
            </div>
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>
            <div style="background-color:transparent;">
            <div class="block-grid three-up" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #BBBBBB;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#BBBBBB;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#BBBBBB"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="200" style="background-color:#BBBBBB;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
            <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 200px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#BBBBBB;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 200px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <div align="center" class="img-container center" style="padding-right: 0px;padding-left: 0px;">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
            <!--[if mso]></td></tr></table><![endif]-->
            </div>
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
            <div style="color:#FFFFFF;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
            <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #FFFFFF; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;"><strong>support@telsuko.com</strong></span></p>
            </div>
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#BBBBBB;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 200px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
            <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
            <tbody>
            <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
            <td >
            <a href="
            https://www.facebook.com/IAmTelsuko" class="fa fa-facebook"></a></td>
            <td >
            <a href="
            https://twitter.com/IAmTelsuko" class="fa fa-twitter"></a>
            </td>
            <td >
            <a href="https://www.youtube.com/channel/UCmZ-Gc8yoKeLyIHbt162Z8w" class="fa fa-youtube"></a>
            </td>
            <td >
            <a href="www.linkedin.com/in/telsuko" class="fa fa-linkedin"></a>
            </td>
            <td >
            <a href="https://www.instagram.com/iamtelsuko/" class="fa fa-instagram"></a>
            </td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
            <div style="color:#FFFFFF;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
            <div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #FFFFFF; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
            <p style="margin: 0; font-size: 12px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 14px; margin-top: 0; margin-bottom: 0;"><strong><span style="font-size: 14px;">We Are Social</span></strong><br/></p>
            </div>
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>
            <div style="background-color:transparent;">
            <div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
            <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
            <div class="col_cont" style="width:100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
            <!--<![endif]-->
            <table cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
            <tr style="vertical-align: top;" valign="top">
            <td align="center" style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 0px; padding-bottom: 5px; padding-left: 0px; text-align: center;" valign="top">
            <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
            <!--[if !vml]><!-->
            <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" valign="top">
            <!--<![endif]-->
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined;" valign="middle"><a href="https://www.Telsuko.com/" style="color:#9d9d9d;text-decoration:none;">Telsuko.com</a></td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            <!--[if (!mso)&(!IE)]><!-->
            </div>
            <!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
            </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
            </tr>
            </tbody>
            </table>
            <!--[if (IE)]></div><![endif]-->
            </body>
            </html>
        `;

        await sendMail(
            user.email,
            "Reset Password",
            "Please reset your password.",
            html
        );
        return res.status(200).json({
            success: true,
            message: "Password reset link is sent your email.",
        });
        // } catch (err) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "An error occurred.",
        //     });
        // }
    }
);




router.get("/reset-password-now/:resetPasswordToken", async(req, res) => {
    try {
        let { resetPasswordToken } = req.params;
        let user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpiresIn: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Password reset token is invalid or has expired.",
            });
        }
        return res.sendFile(join(__dirname, "../templates/password-reset.html"));
    } catch (err) {
        return res.sendFile(join(__dirname, "../templates/errors.html"));
    }
});




router.post("/api/reset-password-now", async(req, res) => {
    try {
        let { resetPasswordToken, password } = req.body;
        let user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpiresIn: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Password reset token is invalid or has expired.",
            });
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresIn = undefined;
        await user.save();
        // Send notification email about the password reset successfull process
        let html = `
        <div>
            <h1>Hello, ${user.username}</h1>
            <p>Your password is resetted successfully.</p>
            <p>If this rest is not done by you then you can contact our team.</p>
        </div>
      `;
        await sendMail(
            user.email,
            "Reset Password Successful",
            "Your password is changed.",
            html
        );
        return res.status(200).json({
            success: true,
            message: "Your password reset request is complete and your password is resetted successfully. Login into your account with your new password.",
        });
    } catch (err) {
        return res.status(500).json({

            Message: "Something went wrong.",
        });
    }
});

export default router;