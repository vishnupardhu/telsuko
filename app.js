import cors from "cors";
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import path from 'path';
import { DB, PORT } from "./constants/index.js";
import userApis from "./apis/users.js";
import postApis from "./apis/posts.js";
import profileApis from "./apis/profiles.js";
import questionApis from "./apis/questions.js";
import fetchApis from "./apis/fetch.js";
import search from "./apis/search.js";
import global from "./apis/global.js";
import questfetchApis from "./apis/questfetch.js";
import questpostApis from "./apis/questpost.js";
import storiesfetchApis from "./apis/storiesfetch.js";
import storiespostApis from "./apis/storiespost.js";
import notesfetchApis from "./apis/notesfetch.js";
import notespostApis from "./apis/notespost.js";
import testfetchApis from "./apis/testfetch.js";
import testpostApis from "./apis/testpost.js";
import testsectionfetchApis from "./apis/testsectionfetch.js";
import testsectionpostApis from "./apis/testsectionpost.js";
const __dirname = path.resolve();
//require("./middlewares/passport-middleware");
// Import passport middleware



const app = express();


app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "./uploads/")));
app.use(express.static(path.join(__dirname, "./uploads/profiles/avatar/")));
app.use(express.static(path.join(__dirname, "./uploads/profiles/coverpic/")));
app.use(express.static(path.join(__dirname, "./uploads/tests/")));
app.use(express.static(path.join(__dirname, "./uploads/quests/")));
app.use(express.static(path.join(__dirname, "./uploads/stories/")));
app.use(express.static(path.join(__dirname, "./uploads/tuts/")));
app.use("/templates", express.static(__dirname + "/templates"));

// Inject Sub router and apis
app.use("/users", userApis);
app.use("/posts", postApis);
app.use("/profiles", profileApis);
app.use("/questions", questionApis);
app.use("/fetch", fetchApis);
app.use("/search", search);
app.use("/", global);
app.use("/questpost", questpostApis);
app.use("/questfetch", questfetchApis);
app.use("/storiespost", storiespostApis);
app.use("/storiesfetch", storiesfetchApis);
app.use("/notespost", notespostApis);
app.use("/notesfetch", notesfetchApis);
app.use("/testpost", testpostApis);
app.use("/testfetch", testfetchApis);
app.use("/sectionpost", testsectionpostApis);
app.use("/sectionfetch", testsectionfetchApis);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/index.html"))
});

app.get('/terms-of-service', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/terms-and-conditions.html"))
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/privacy-policy.html"))
});

app.get('/disclaimer', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/disclaimer.html"))
});

app.get('/content-guidelines', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/content-guidelines.html"))
});

app.get('/copyright-policy', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/copyright-policy.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/error_404.html"))
});



const main = async() => {
    try {
        // Connect with the database
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        consola.success("DATABASE CONNECTED...");
        // Start application listening for request on server
        app.listen(PORT, () => consola.success(`Sever started on port ${PORT}`));
    } catch (err) {
        consola.error(`Unable to start the server \n${err.message}`);
    }
};

main();