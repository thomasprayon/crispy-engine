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

//OTHER PROFILE --> /other-user/:id
app.get("/other-user/:id", (req, res) => {
    console.log("GET /other-user/:id was made");
    // console.log("req.params: ", req.params);
    // console.log("req.session: ", req.session);
    const { id } = req.params;
    const { userId } = req.session;
    if (parseInt(id) === userId) {
        res.json({
            error: "UserId and Id are the same",
        });
    } else {
        db.getOtherUsers(id)
            .then((result) => {
                // console.log("result getOtherUser: ", result);
                if (result.rows.length === 0) {
                    res.json({
                        error: "User is trying to enter a no valid url",
                    });
                } else {
                    res.json(result.rows[0]);
                }
            })
            .catch((err) => {
                console.log("Error in GET /other-user/:id", err);
            });
    }
});

// GET FIND USERS (NEWEST USERS) --> /find-users
app.get("/find-users", (req, res) => {
    console.log("GET /find/users was made");
    db.getNewestUsers()
        .then((result) => {
            // console.log("result.rows", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in GET /find/users", err);
        });
});

// GET FIND USERS (FIND OTHER USERS)
app.get("/find-users/:id", (req, res) => {
    console.log("GET /find-users/:id was made");
    console.log("req.params", req.params);
    const { id } = req.params;
    db.searchForUsersInformation(id)
        .then((result) => {
            // console.log("result.rows", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in GET /find-users/:id", err);
        });
});

// GET FRIENDSTATUS (FRIEND REQUESTS)
app.get("/friend-status/:id", (req, res) => {
    console.log("GET /friend-status/:id was made");
    // console.log("req.session.userId: ", req.session.userId);
    // console.log("req.params.id: ", req.params.id);
    const loggedUser = req.session.userId;
    // console.log("loggedUser :", loggedUser);
    const viewedUser = req.params.id;
    // console.log("viewedUser: ", viewedUser);
    db.friendshipStatus(loggedUser, viewedUser)
        .then((result) => {
            // console.log("result.rows", result.rows);
            // console.log("result.rows.length", result.rows.length);
            // console.log("result.rows[0].accepted: ", result.rows[0].accepted);

            //if the result is an empty[] then "Add Friend"
            //if accepted = false --> "Cancel or Accept Friend Request"
            //depens on the receiver of the friend reqeuest === userId(loggedUser) --> should render "Accept" or "Cancel" if they send it
            //if accepted = true --> should render "End Friendship"
            if (result.rows.length === 0) {
                res.json({
                    success: true,
                    btnText: "Add Friend",
                });
            }
            if (result.rows[0].accepted) {
                res.json({
                    success: true,
                    btnText: "End Friendship",
                });
            }
            if (!result.rows[0].accepted) {
                if (result.rows[0].recipient_id === loggedUser) {
                    res.json({
                        success: true,
                        btnText: "Accept Friend Request",
                    });
                } else {
                    res.json({
                        success: true,
                        btnText: "Cancel Friend Request",
                    });
                }
            }
        })
        .catch((err) => {
            console.log("Error in GET /friend-status/:id", err);
        });
});

//POST FRIENDSTATUS (FRIEND REQUESTS)
app.post("/friend-status/:id", (req, res) => {
    console.log("POST /friend-status/:id was made");
    const loggedUser = req.session.userId;
    console.log("POST loggedUser :", loggedUser);
    const viewedUser = req.params.id;
    console.log("POST viewedUser: ", viewedUser);
    // console.log("req.body", req.body);
    const { btnText } = req.body;
    console.log("POST btn.text: ", btnText);
    //if it shows "Add Friend" --> should show on (loggedUser) =  "Cancel Request"
    //if it shows "Accept Friend Request" --> should show on (loggedUser) = "End Friendship"
    //if it shows "End Friendship or "Cancel Friend Request" --> should show on (loggedUser) = "Add Friend"
    if (btnText === "Add Friend") {
        db.makeFriendRequest(loggedUser, viewedUser)
            .then((result) => {
                // console.log("result.rows", result.rows);
                res.json({
                    success: true,
                    result: result.rows,
                    btnText: "Cancel Request",
                });
            })
            .catch((err) => {
                console.log("Error in POST /friend-status/ AddFriend", err);
            });
    }
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
