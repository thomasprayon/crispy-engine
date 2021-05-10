const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { COOKIE_SECRET } = require("./secrets.json");
const { hash, compare } = require("./bc");
const db = require("./db");

app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

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
