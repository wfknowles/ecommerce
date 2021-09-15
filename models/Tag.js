const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// * Tag
//    * id              Integer    Doesn't allow null values   Set as primary key  Uses auto increment
//    * tag_name        String

class Tag extends Model {}

Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tag'
    }
);

module.exports = Tag;