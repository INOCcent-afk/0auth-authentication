CREATE TABLE testUsers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    age INT,
    uid VARCHAR NOT NULL
);

INSERT INTO testUsers(email, username, name, age, uid) values('test@gmail.com', 'testUsername', 'test', 69, );