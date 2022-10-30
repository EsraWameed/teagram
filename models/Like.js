const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    
    picture_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'picture',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
  }
);
module.exports = Like;