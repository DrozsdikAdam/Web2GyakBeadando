module.exports = (sequelize, DataTypes) => {
    const Mozi = sequelize.define('Mozi', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nev: {
            type: DataTypes.STRING,
            allowNull: false
        },
        varos: {
            type: DataTypes.STRING
        },
        ferohely: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'mozi',
        timestamps: false
    });

    return Mozi;
};