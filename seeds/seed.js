const sequelize = require('../Config/connection');
const { User, Post } = require('../Models');

const userSeedData = require('./userData.json');
const postSeedData = require('./postData.json');

async function seedDatabase(){
    await sequelize.sync({ force: true });
    await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true
    });
    postSeedData.forEach(post => {
        let newText = post.content.join();
        post.content = newText;
    })
    await Post.bulkCreate(postSeedData);

    process.exit();
}

seedDatabase();