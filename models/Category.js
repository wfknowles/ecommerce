const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/*
    Category
    * id              Integer    Doesn't allow null values   Set as primary key  Uses auto increment 
    * category_name   String     Doesn't allow null values
*/

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
    }
);

module.exports = Category;