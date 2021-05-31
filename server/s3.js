const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("amazon upload complete!");
            fs.unlink(path, () => {}); //this is gonna delete your poto from the upload folder
            next();
        })
        .catch((err) => {
            // uh oh
            console.log("Error in s3 upload put object:", err);
            res.sendStatus(404);
        });
};
module.exports.delete = (imgUrl) => {
    return s3
        .delete({ Bucket: "spicedling", Key: "img_url" })
        .promise()
        .then(() => console.log("Img in S3 was successfully deleted!!"));
};
