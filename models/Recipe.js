const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serving_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    prep_time : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cook_time : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rest_time : {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    directions: {
      type: DataTypes.STRING,
    },
    imageURL: {
        type: DataTypes.STRING,
    }

   

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Recipe',
  }
);

module.exports = Recipe;
