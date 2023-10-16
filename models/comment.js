const { Model, DataTypes } = require('sequelize');
const moment = require('moment');
const sequelize = require('../config/connection');

/**
 * @class Comment
 * @param {int} id - generated on creation
 * @param {text} content - content of the comment
 * @param {int} author_id - reference to author who created the comment
 * @param {int} post_id - reference to post this belongs to
 * @param {date} created_at - time of creation
 * 
 * date is generated on creation using timestamps
 */
class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false,
            get() {
                return moment(this.dataValues.created_at).format('MMM D, YYYY HH:mm:ss');
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)

module.exports = Comment;