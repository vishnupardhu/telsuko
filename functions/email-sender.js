import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.APP_HOST_EMAIL,
        pass: process.env.APP_HOST_EMAIL_VERIFY,
    }
});
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});
const sendMail = async(email, subject, text, html) => {
    try {
        const msg = {
            html,
            text,
            subject,
            to: email,
            from: process.env.APP_HOST_EMAIL,
        };
        console.log(msg);
        await transporter.sendMail(msg);
        console.log("MAIL_SENT");
    } catch (err) {
        console.log("ERROR_MAILING", err.message);
    } finally {
        return;
    }
};

export default sendMail;