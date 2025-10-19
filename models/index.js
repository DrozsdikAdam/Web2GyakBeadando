const dbConfig = require('../config/db.js');
const { Sequelize, DataTypes } = require('sequelize');

// Sequelize példányosítása a konfigurációval
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modellek betöltése
db.Film = require('./film.model.js')(sequelize, DataTypes);
db.Mozi = require('./mozi.model.js')(sequelize, DataTypes);
db.Eloadas = require('./eloadas.model.js')(sequelize, DataTypes);
db.User = require('./user.model.js')(sequelize, DataTypes);
db.Message = require('./messages.model.js')(sequelize, DataTypes);

//kapcsolatok a táblák között
db.Film.hasMany(db.Eloadas, { foreignKey: 'filmid' });
db.Eloadas.belongsTo(db.Film, { foreignKey: 'filmid' });

db.Mozi.hasMany(db.Eloadas, { foreignKey: 'moziid' });
db.Eloadas.belongsTo(db.Mozi, { foreignKey: 'moziid' });

//egy felhasználónak több üzenete lehet
db.User.hasMany(db.Message, { foreignKey: 'userId' });
db.Message.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;