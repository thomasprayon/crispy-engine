const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");

module.exports.addUser = (firstName, lastName, email, hashPassword) => {
    const q = `INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [firstName, lastName, email, hashPassword];
    return db.query(q, params);
};

module.exports.getUser = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};
