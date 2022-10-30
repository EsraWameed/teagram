const sequelize = require('../config/connection');
const { User, Picture, Comment, Like } = require('../models');

const userData = require('./userData.json');
const pictureData = require('./pictureData.json');
const commentData = require('./commentData.json');
const likeData = require('./likeData.json');
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Picture.bulkCreate(pictureData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  await Like.bulkCreate(likeData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();