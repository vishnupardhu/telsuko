import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
// const multerS3 = require("multer-s3");
//const aws = require("aws-sdk");





const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.AWS_REGIONAL,
});


export const uploadviss3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, filename);
        },
    }),
});
export const uploadps3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `avatar-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadProfileCoverpics3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, filename);
        },
    }),
});

export const uploadProfileAvatars3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `avatar-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadquestS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, filenamequest);
        },
    }),
});
export const uploadstoryS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, filenamestory);
        },
    }),
});
export const uploadtopicS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, filenamenote);
        },
    }),
});
export const uploadtestsS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, filenametest);
        },
    }),
});
var storage = multer.diskStorage({
    destination: function(req, file, cd) {
        if (file.fieldname === 'avatar') {
            cd(null, `${__dirname}/../uploads/profiles/avatar`);
        } else if (file.fieldname === 'coverpic') {
            cd(null, `${__dirname}/../uploads/profiles/coverpic`);
        }
    },

    filename: function(req, file, cd) {

        let lastIndexof = file.originalname.lastIndexOf(".");
        let ext = file.originalname.substring(lastIndexof);
        cd(null, `avatar-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);

        //cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const filename = (req, file, next) => {
    let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `avatar-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);

};
const filenamequest = (req, file, next) => {

    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `Quest-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);

};
const filenametest = (req, file, next) => {

    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `test-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);

};
const filenamestory = (req, file, next) => {

    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `story-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);

};
const filenamenote = (req, file, next) => {

    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `avatar-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);

};
const filenamecover = (req, file, next) => {
    // if (!file) {
    //     next(null, `coverpic`);
    // } else {
    //     let lastIndexof = file.originalname.lastIndexOf(".");
    //     let ext = file.originalname.substring(lastIndexof);
    //     next(null, `coverimage-${Date.now()}${ext}`);
    // }
    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `avatar-${Date.now()}${ext}`);
};


const filename2 = (req, file, next) => {
    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `questions-${Date.now()}${ext}`);
};

const destination = (req, file, next) => {
    console.log("hai");
    next(null, `${__dirname}/../uploads`);
};

const postImageDestination = (req, file, next) => {
    console.log("bai");
    next(null, `${__dirname}/../uploads/quests`);
};
const noteImageDestination = (req, file, next) => {
    console.log("bai");
    next(null, `${__dirname}/../uploads/tuts`);
};
const testImageDestination = (req, file, next) => {
    console.log("bai");
    next(null, `${__dirname}/../uploads/tests`);
};
const storyImageDestination = (req, file, next) => {
    console.log("bai");
    next(null, `${__dirname}/../uploads/stories`);
};
const profileAvatarDestination = (req, file, next) => {
    next(null, `${__dirname}/../uploads/profiles/avatar`);
};
const profileCoverpicDestination = (req, file, next) => {
    next(null, `${__dirname}/../uploads/profiles/coverpic`);
};
export var uploadvis = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `mytheory-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
// export const uploadPostImage = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: "mytheory",
//         acl: "public-read",
//         metadata: function(req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function(req, file, cb) {
//             let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
//             let lastIndexof = file.originalname.lastIndexOf(".");
//             let ext = file.originalname.substring(lastIndexof);
//             cb(null, `post-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
//         },
//     }),
// });

export const uploadPostImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {

            if (file.fieldname === "qmedia") {
                cb(null, { fieldName: file.fieldname });
            } else if (file.fieldname === "emedia") {
                cb(null, { fieldName: file.fieldname });
            }

        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            if (file.fieldname === "qmedia") {
                cb(null, `post-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
            } else if (file.fieldname === "emedia") {
                cb(null, `post-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
            }
        },
    }),
}).fields(
    [{
            name: 'qmedia',
            maxCount: 1
        },
        {
            name: 'emedia',
            maxCount: 1
        },

    ]
);

export const uploadquestmedia = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `post-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});


export const uploadexplanmedia = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `post-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadExplImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file1, cb) {
            cb(null, { fieldName: file1.fieldname });
        },
        key: function(req, file1, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file1.originalname.lastIndexOf(".");
            let ext = file1.originalname.substring(lastIndexof);
            cb(null, `post-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadTestImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `test-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadStoriesImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `story-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadNoteImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `topic-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadSchapImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `story-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadNchapImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `topic-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadProfileAvatar = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `avatar-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export const uploadProfileCoverpic = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `cover-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});

export const uploadp = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file.originalname.lastIndexOf(".");
            let ext = file.originalname.substring(lastIndexof);
            cb(null, `mytheory-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "mytheory",
        acl: "public-read",
        metadata: function(req, file1, cb) {
            cb(null, { fieldName: file1.fieldname });
        },
        key: function(req, file1, cb) {
            let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let lastIndexof = file1.originalname.lastIndexOf(".");
            let ext = file1.originalname.substring(lastIndexof);
            cb(null, `mydesk-${Date.now().toString(36) + Math.random().toString(36).slice(2)}${Date.now()}${ext}`);
        },
    }),
});
export default upload;