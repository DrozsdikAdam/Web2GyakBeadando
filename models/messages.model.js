module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uzenet: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // a users táblára hivatkozik
                key: 'id'
            }
        }
    }, {
        tableName: 'messages',
        timestamps: true // Automatikusan hozzáadja a createdAt és updatedAt mezőket
    });

    return Message;
};