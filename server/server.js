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
    // console.log("req.csrfToken: ", req.csrfToken());
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

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
                console.log("result.rows: ", result.rows);
                db.insertCode(email, code)
                    .then((result) => {
                        // console.log("result inside InsertCode: ", result);
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
            console.log("result.rows[0]", result.rows[0]);
            if (result.rows[0].code === code) {
                hash(password)
                    .then((hashPassword) => {
                        db.updateUsersPassword(email, hashPassword)
                            .then((result) => {
                                console.log("result", result);
                            })
                            .catch((err) => {
                                console.log("Error in updating Password", err);
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
