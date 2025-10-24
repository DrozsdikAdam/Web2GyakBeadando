module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
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
        },

        // Hozzáadjuk a userId mezőt, ami a User modellre hivatkozik
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Lehetővé tesszük a NULL értéket, ha vannak régi üzenetek felhasználó nélkül
        }
    }, {
        tableName: 'messages'
    });

    return Message;
};