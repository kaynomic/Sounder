'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Playlists', [

    // 1
    {
      name: "Super chill vibes bruh",
      previewImage: "image url",
      userId: 5
    },

    // 2
    {
      name: "Classics",
      previewImage: "image url",
      userId: 1
    },

    // 3
    {
      name: "BANGERZ",
      previewImage: "image url",
      userId: 3
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
