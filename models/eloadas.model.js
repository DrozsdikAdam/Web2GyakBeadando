module.exports = (sequelize, DataTypes) => {
    const Eloadas = sequelize.define('Eloadas', {
        
        filmid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'film',
                key: 'id'
            }
        },
        moziid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'mozi',
                key: 'id'
            }
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