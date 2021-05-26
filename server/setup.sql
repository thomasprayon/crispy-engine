DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;


CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    first_name      VARCHAR NOT NULL CHECK (first_name <> ''),
    last_name       VARCHAR NOT NULL CHECK (last_name <> ''),
    email           VARCHAR NOT NULL CHECK (email <> ''),
    password_hash   VARCHAR NOT NULL CHECK (password_hash <> ''),
    img_url         VARCHAR,
    bio             VARCHAR,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reset_codes(
    id          SERIAL PRIMARY KEY,
    email       VARCHAR NOT NULL,
    code        VARCHAR NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE friendships(
    id              SERIAL PRIMARY KEY,
    sender_id       INT REFERENCES users(id) NOT NULL,
    recipient_id    INT REFERENCES users(id) NOT NULL,
    accepted        BOOLEAN DEFAULT false);



CREATE TABLE messages (
    id              SERIAL PRIMARY KEY,
    sender_id       INT REFERENCES users(id) NOT NULL,
    message         VARCHAR NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)