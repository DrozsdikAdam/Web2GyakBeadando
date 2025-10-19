module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Messages', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nev: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        uzenet: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'messages'
    });

    return Message;
};