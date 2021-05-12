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

module.exports.insertCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING email, code `;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.selectCode = (email) => {
    const q = `SELECT * FROM reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`;
    const params = [email];
    return db.query(q, params);
};

module.exports.updateUsersPassword = (email, hashPassword) => {
    const q = `UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *`;
    const params = [email, hashPassword];
    return db.query(q, params);
};
