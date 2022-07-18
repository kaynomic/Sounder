'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Playlists', [

    // 1
    {

    },

    // 2
    {

    },

    // 3
    {

    },

    // 4
    {

    },

    // 5
    {

    }
  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
