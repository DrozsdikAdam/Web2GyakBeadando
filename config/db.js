const dotenv = require('dotenv');
dotenv.config();

// config/db.js
module.exports = {
    HOST: process.env.DB_HOST, //az adatbázis szerver ip címe
    USER: process.env.DB_USER, //felhasználónév(neked, nekem: studb015)
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME, //Az adatbázis neve
    dialect: 'mysql', // Az adatbázis típusa (pl. 'mysql', 'postgres', 'sqlite')
    pool: { // Kapcsolat-pool
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};