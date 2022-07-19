'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Comments', [

    // 1
    {
      body: "Nice Dodgeball reference. LOL.",
      userId: 1,
      songId: 1
    },

    // 2
    {
      body: "Great track!",
      userId: 1,
      songId: 2
    },

    // 3
    {
      body: "I'm very confused",
      userId: 2,
      songId: 4
    },

    // 4
    {
      body: "This song is a classic!",
      userId: 3,
      songId: 5
    },

    // 5
    {
      body: "I'm crying tears of happiness.",
      userId: 3,
      songId: 6
    },

    // 6
    {
      body: "BANGER ALERT!!!",
      userId: 3,
      songId: 7
    },

    // 7
    {
      body: "You got bars",
      userId: 4,
      songId: 11
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
