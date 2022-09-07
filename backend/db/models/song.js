'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.User, {
        foreignKey: "userId",
        as: "Artist"
      }),
      Song.belongsTo(models.Album, { foreignKey: "albumId" }),
      Song.hasMany(models.Comment, { foreignKey: "songId" }),
      Song.belongsToMany(models.Playlist, {
        through: "PlaylistSong",
        otherKey: "playlistId",
        foreignKey: "songId"
      })
    }
  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
