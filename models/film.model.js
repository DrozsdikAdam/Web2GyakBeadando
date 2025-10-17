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
};