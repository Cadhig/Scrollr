const sequelize = require('../config/connection');
const { Users, Posts, Comments } = require('../models');

const seedData = require('./seedData');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    // Seed Users
    const users = await Users.bulkCreate(seedData.users, {
        individualHooks: true,
        returning: true,
    });
    console.log(`Seeded ${users.length} users`);

    // Seed Posts
    for (const post of seedData.posts) {
        const newPost = await Posts.create(post);
        const randomUser = users[Math.floor(Math.random() * users.length)];
        await newPost.setUser(randomUser);
    }
    console.log(`Seeded ${seedData.posts.length} posts`);

    const commentsWithAssociations = seedData.comments.map(comments => {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomPost = seedData.posts[Math.floor(Math.random() * seedData.posts.length)];
        return { ...comments, user_id: randomUser.id, post_id: randomPost.id };
    });

    await Comments.bulkCreate(commentsWithAssociations);


    process.exit(0);
};
console.log("seeding..$")
seedDatabase();
