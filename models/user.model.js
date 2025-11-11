module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'users_username_unique', // Explicit név az indexnek
                msg: 'A felhasználónév már foglalt.'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'users_email_unique', // Explicit név az indexnek
                msg: 'Az email cím már foglalt.'
            },
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'regisztralt'
        }
    }, {
        tableName: 'users',
        timestamps: true
    });

    return User;
};
