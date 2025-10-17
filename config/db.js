// config/db.js
module.exports = {
    HOST: '143.47.98.96', //az adatbázis szerver ip címe
    USER: 'studb010', //felhasználónév(neked, nekem: studb015)
    PASSWORD: '',
    DB: '', //Az adatbázis neve
    dialect: 'mysql', // Az adatbázis típusa (pl. 'mysql', 'postgres', 'sqlite')
    pool: { // Kapcsolat-pool
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};