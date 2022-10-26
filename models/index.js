const User = require('./User');
const Picture = require('./Picture');
const Comment = require('./Comment');

User.hasMany(Picture, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Picture.belongsTo(User, {
  foreignKey: 'user_id'
});

Picture.hasMany(Comment,{
  foreignKey: 'picture_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Picture, Comment };