const express = require("express");
const app = express();

const compression = require("compression");
const path = require("path");

const cookieSession = require("cookie-session");
const { COOKIE_SECRET } = require("../secrets.json");
const csurf = require("csurf");

const { hash, compare } = require("./bc");
const db = require("./db");

const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

const multer = require("multer");
const uidSafe = require("uid-safe");

app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.setHeader("x-frame-options", "deny");
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

app.use(compression());

// ROUTES

//GET MAINPAGE --> /welcome
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

//POST REGISTRATION --> /registration
app.post("/registration", (req, res) => {
    console.log("POST /registration made!!");
    // console.log("req.body", req.body);
    const { firstName, lastName, email, password } = req.body;
    hash(password)
        .then((hashPassword) => {
            db.addUser(firstName, lastName, email, hashPassword)
                .then((result) => {
                    // console.log("result.rows ", result.rows);
                    const { id } = result.rows[0];
                    req.session.userId = id;
                    res.json({
                        success: true,
                    });
                })
                .catch((err) => {
                    console.log("Error in POST addUser /registration", err);
                    res.json({
                        success: false,
                    });
                });
        })
        .catch((err) => {
            console.log("Error in POST /registration", err);
        });
});

//POST LOGIN --> /login
app.post("/login", (req, res) => {
    console.log("POST /login made!!");
    // console.log("req.body", req.body);
    const { email, password } = req.body;
    db.getUser(email).then((result) => {
        // console.log("result.rows", result.rows);
        console.log("result.rows[0]", result.rows[0]);
        const { password_hash } = result.rows[0];
        const { id } = result.rows[0];
        // console.log("password_hash", password_hash);
        // console.log("id", id);
        compare(password, password_hash)
            .then((match) => {
                console.log("match", match);
                if (match === true) {
                    req.session.userId = id;
                    res.json({
                        success: true,
                    });
                } else {
                    // console.log("SOMETHING IS WRONG HERE!");
                    res.json({
                        success: false,
                    });
                }
            })
            .catch((err) => {
                console.log("Error in POST /login", err);
            });
    });
});

//POST  RESET PASSWORD --> /password/reset/start
app.post("/password/reset/start", (req, res) => {
    console.log("POST /password/reset/START made!!");
    // console.log("req.body", req.body);
    const { email } = req.body;
    const code = cryptoRandomString({
        length: 6,
    });
    db.getUser(email)
        .then((result) => {
            // console.log("result: ", result);
            if (result.rows[0]) {
                // console.log("result.rows: ", result.rows);
                db.insertCode(email, code)
                    .then((result) => {
                        // console.log("result inside InsertCode: ", result);
                        console.log(
                            "result.rows[0].email",
                            result.rows[0].email
                        );
                        sendEmail(
                            result.rows[0].email,
                            `Here is the verification code for you: ${result.rows[0].code}`,
                            "Reset password"
                        );
                        res.json({
                            success: true,
                        });
                    })
                    .catch((err) => {
                        console.log("Error in insertCode", err);
                        res.json({
                            success: false,
                        });
                    });
            }
        })
        .catch((err) => {
            console.log("Error in POST /password/reset/start", err);
        });
});

//POST RESET PASSWORD --> /password/reset/verify
app.post("/password/reset/verify", (req, res) => {
    console.log("POST /password/reset/VERIFY made!!");
    // console.log("req.body", req.body);
    const { email, code, password } = req.body;
    db.selectCode(email)
        .then((result) => {
            // console.log("result.rows[0]", result.rows[0]);
            if (result.rows[0].code === code) {
                hash(password)
                    .then((hashPassword) => {
                        db.updateUsersPassword(email, hashPassword)
                            .then(() => {
                                res.json({
                                    success: true,
                                });
                            })
                            .catch((err) => {
                                console.log("Error in updating Password", err);
                                res.json({
                                    success: false,
                                });
                            });
                    })
                    .catch((err) => {
                        console.log("Error in hashing the password", err);
                        res.json({
                            success: false,
                        });
                    });
            }
        })
        .catch((err) => {
            console.log("Error in POST /password/reset/verify", err);
        });
});

//POST UPLOAD PROFPIC --> /upload
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("POST /upload made!!");
    // console.log("req.body", req.body);
    // console.log("req.file", req.file);
    if (req.file) {
        const { filename } = req.file;
        const fullUrl = s3Url + filename;
        // console.log("fullUrl", fullUrl);
        // console.log("req.session", req.session);
        const { userId } = req.session;
        db.uploadProfilePic(fullUrl, userId)
            .then((result) => {
                // console.log("result.rows: ", result.rows);
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.log("Error in POST /upload", err);
            });
    }
});

//GET USER INFO --> /user
app.get("/user", (req, res) => {
    console.log("GET user made!");
    // console.log("req.session", req.session);
    const { userId } = req.session;
    db.getUserInformation(userId)
        .then((result) => {
            // console.log("result.rows", result.rows);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("Error in GET /user", err);
        });
});

//POST UPDATE BIO --> /update-bio
app.post("/update-bio", (req, res) => {
    console.log("POST /update-bio made!!");
    // console.log("req.body", req.body);
    // console.log("req.session", req.session);
    const { bio } = req.body;
    const { userId } = req.session;
    db.updateBio(bio, userId)
        .then((result) => {
            // console.log("result.rows", result.rows);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("Error in POST /update-bio", err);
        });
});

//LOGOUT --> /logout
app.get("/logout", (req, res) => {
    console.log("GET /logout made!!");
    req.session.userId = null;
    res.redirect("/welcome");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
