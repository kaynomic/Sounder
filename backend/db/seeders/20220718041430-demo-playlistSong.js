'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('PlaylistSongs', [

    // 1
    {
      playlistId: 1,
      songId: 1
    },

    // 2
    {
      playlistId: 1,
      songId: 5
    },

    // 3
    {
      playlistId: 1,
      songId: 12
    },

    // 4
    {
      playlistId: 2,
      songId: 6
    },

    // 5
    {
      playlistId: 2,
      songId: 9
    },

    // 6
    {
      playlistId: 2,
      songId: 10
    },

    // 7
    {
      playlistId: 3,
      songId: 7
    },

    // 8
    {
      playlistId: 3,
      songId: 11
    },
  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
