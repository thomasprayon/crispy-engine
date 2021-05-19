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

module.exports.uploadProfilePic = (fullUrl, userId) => {
    const q = `UPDATE users SET img_url = $1 WHERE id = $2 RETURNING *`;
    const params = [fullUrl, userId];
    return db.query(q, params);
};

module.exports.getUserInformation = (userId) => {
    const q = `SELECT * FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.updateBio = (bio, id) => {
    const q = `UPDATE users SET bio = $1 WHERE id = $2 RETURNING *`;
    const params = [bio, id];
    return db.query(q, params);
};

module.exports.getOtherUsers = (userId) => {
    const q = `SELECT id, first_name, last_name, img_url, bio FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getNewestUsers = () => {
    const q = `SELECT id, first_name, last_name, img_url FROM users ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.searchForUsersInformation = (searchInput) => {
    const q = `SELECT id, first_name, last_name, img_url FROM users WHERE first_name ILIKE $1`;
    const params = [`${searchInput}%`];
    return db.query(q, params);
};

module.exports.friendshipStatus = (loggedUser, viewedUser) => {
    const q = `SELECT * FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [loggedUser, viewedUser];
    return db.query(q, params);
};

module.exports.makeFriendRequest = (loggedUser, viewedUser) => {
    const q = `INSERT INTO friendships (recipient_id, sender_id) VALUES ($1, $2) RETURNING *`;
    const params = [loggedUser, viewedUser];
    return db.query(q, params);
};

module.exports.acceptFriendRequest = (loggedUser, viewedUser) => {
    const q = `UPDATE friendships SET accepted = 'true' WHERE sender_id = $2 AND recipient_id = $1 RETURNING * `;
    const params = [loggedUser, viewedUser];
    return db.query(q, params);
};

module.exports.deleteFriendshipStatus = (loggedUser, viewedUser) => {
    const q = `DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [loggedUser, viewedUser];
    return db.query(q, params);
};
