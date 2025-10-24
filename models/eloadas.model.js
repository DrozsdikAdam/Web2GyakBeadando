module.exports = (sequelize, DataTypes) => {
    const Eloadas = sequelize.define('Eloadas', {
        filmid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        moziid: {
            type: DataTypes.INTEGER,
        },
        datum: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nezoszam: {
            type: DataTypes.INTEGER
        },
        bevetel: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'eloadas',
        timestamps: false
    });

    return Eloadas;
};