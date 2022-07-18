'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Songs', [

    // 1
    {
      title: "Dodging Questions",
      description: "if you can dodge a wrench, you can dodge a question",
      url: "wasd",
      previewImage: "image url",
      userId: 1,
      albumId: 1
    },

    // 2
    {
      title: "Guessing Game",
      description: "who what where when how",
      url: "wasd",
      previewImage: "image url",
      userId: 1,
      albumId: 1
    },

    // 3
    {
      title: "Thrice",
      description: "third song on the album",
      url: "wasd",
      previewImage: "image url",
      userId: 1,
      albumId: 1
    },

    // 4
    {
      title: "What Is It",
      description: "is this even a song",
      url: "wasd",
      previewImage: "image url",
      userId: 2,
      albumId: 2
    },

    // 5
    {
      title: "Jenny from the Block",
      description: "a song about Jenny from the block",
      url: "wasd",
      previewImage: "image url",
      userId: 3,
      albumId: 3
    },

    // 6
    {
      title: "Love Don't Cost A Thing",
      description: "love is free",
      url: "wasd",
      previewImage: "image url",
      userId: 3,
      albumId: 3
    },

    // 7
    {
      title: "Club Banger 2000",
      description: "this is a club banger",
      url: "wasd",
      previewImage: "image url",
      userId: 3,
      albumId: 3
    },

    // 8
    {
      title: "Tech Ten",
      description: "a techno song",
      url: "wasd",
      previewImage: "image url",
      userId: 3,
      albumId: 4
    },

    // 9
    {
      title: "Batman",
      description: "a song about Batman",
      url: "wasd",
      previewImage: "image url",
      userId: 3,
      albumId: 4
    },

    // 10
    {
      title: "Fisher Price",
      description: "the price of fish",
      url: "wasd",
      previewImage: "image url",
      userId: 3,
      albumId: 4
    },

    // 11
    {
      title: "Clouds",
      description: "a song about clouds",
      url: "wasd",
      previewImage: "image url",
      userId: 4,
      albumId: 5
    },

    // 12
    {
      title: "Conversation",
      description: "a conversation",
      url: "wasd",
      previewImage: "image url",
      userId: 4,
      albumId: 5
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
