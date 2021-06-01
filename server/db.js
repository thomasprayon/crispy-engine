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
    const q = `SELECT id, first_name, last_name, img_url FROM users WHERE first_name ILIKE $1 LIMIT 4`;
    const params = [`${searchInput}%`];
    return db.query(q, params);
};

module.exports.friendshipStatus = (viewedUser, loggedUser) => {
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
    const q = `UPDATE friendships SET accepted = true WHERE sender_id = $1 AND recipient_id = $2 RETURNING * `;
    const params = [loggedUser, viewedUser];
    return db.query(q, params);
};

module.exports.deleteFriendshipStatus = (loggedUser, viewedUser) => {
    const q = `DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [loggedUser, viewedUser];
    return db.query(q, params);
};

module.exports.getFriendsAndWannabes = (loggedUser) => {
    const q = `SELECT users.id, first_name, last_name, img_url, accepted
                FROM friendships
                JOIN users
                ON (accepted = false AND sender_id = $1 AND recipient_id = users.id)
                OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
                OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
                `;
    const params = [loggedUser];
    return db.query(q, params);
};

module.exports.insertMessages = (message, userId) => {
    const q = `INSERT INTO messages (message, sender_id) VALUES ($1, $2) RETURNING *`;
    const params = [message, userId];
    return db.query(q, params);
};

module.exports.getLastTenMessages = () => {
    const q = `SELECT first_name, last_name, img_url, message, messages.created_at FROM users JOIN messages ON messages.sender_id = users.id ORDER BY messages.created_at DESC LIMIT 10`;
    return db.query(q);
};

module.exports.deleteUserFromUsers = (userId) => {
    const q = `DELETE FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.deleteUserFromFriendships = (userId) => {
    const q = `DELETE FROM friendships WHERE recipient_id = $1 OR sender_id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.deleteUserFromMessages = (userId) => {
    const q = `DELETE FROM messages WHERE sender_id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getOnlineUsers = (onlineUsers) => {
    const q = `SELECT id, first_name, last_name, img_url FROM users WHERE id = ($1)`;
    const params = [onlineUsers];
    return db.query(q, params);
};
