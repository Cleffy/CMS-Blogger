const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// User one to many relationship with Post
User.hasMany(Post, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE'
});
Post.belongsTo(User, {
    foreignKey: 'author_id'
});

User.hasMany(Comment, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'author_id'
}),

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})
Comment.belongsTo(User, {
    foreignKey: 'post_id'
}),

module.exports = { User, Post, Comment };