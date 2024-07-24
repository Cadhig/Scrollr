const bcrypt = require('bcrypt');

class Users extends Model {
}

interface UserProps {
    username: String,
    password: String,
    bio?: String,
    birthday?: String,
    location?: String
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData: UserProps) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10); // Salt rounds = 10
                return newUserData;
            },
        },
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'users',
    }
);

module.exports = Users;
