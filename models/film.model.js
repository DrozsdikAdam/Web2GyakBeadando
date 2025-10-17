<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
    const Film = sequelize.define('Film', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cim: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ev: {
            type: DataTypes.INTEGER
        },
        hossz: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'film',
        timestamps: false
    });

    return Film;
=======
module.exports = (sequelize, DataTypes) => {
    const Film = sequelize.define('Film', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cim: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ev: {
            type: DataTypes.INTEGER
        },
        hossz: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'film',
        timestamps: false
    });

    return Film;
>>>>>>> 9e8e517c99b0d2aa181a8b1e18e69588fbbe019c
};