const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Picture extends Model { }

Picture.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image_post: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:'image',
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    modelName: 'picture',
  }
);

module.exports = Picture;