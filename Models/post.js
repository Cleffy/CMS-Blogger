const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/connection');

/**
 * @class Post
 * @param int id - generated on creation
 * @param string title - title of the post
 * @param text content - content of the post
 * @param int author_id - reference to author who created the post
 * 
 * date is generated on creation using timestamps
 */
class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;