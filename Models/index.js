const User = require('./user');
const Post = require('./post');

// User one to many relationship with Post
User.hasMany(Post, {
    foreignKey: 'author_id'
});
Post.belongsTo(User, {
    foreignKey: 'author_id'
});

module.exports = { User, Post };