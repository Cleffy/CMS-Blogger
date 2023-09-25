const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../Config/connection');

/**
 * @class User
 * @param int id - Assigned at creation
 * @param string name
 * @param string email - Must be in email format
 * @param string password - Must be a minimum of 8 characters
 * Password is hashed on creation and update.
 */
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUser) => {
                try {
                    newUser.password = await bcrypt.hash(newUser.password, 10);
                    return newUser;
                }
                catch(error) {
                    console.error(error);
                    return error;
                }
            },
            beforeUpdate: async (updatedUser) => {
                try {
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                    return updatedUser;
                }
                catch(error) {
                    console.error(error);
                    return error;
                }
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;