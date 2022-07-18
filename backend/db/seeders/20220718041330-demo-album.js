'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Albums', [

    // 1
    {
      title: "Dropout Boogie",
      description: "an album liked by Joe Rogan, created by the Black Keys",
      previewImage: "image url",
      userId: 1
    },

    // 2
    {
      title: "Certainly Uncertain",
      description: "an album unsure of itself",
      previewImage: "image url",
      userId: 2
    },

    // 3
    {
      title: "On the 6",
      description: "an album by Jennifer Lopez",
      previewImage: "image url",
      userId: 3
    },

    // 4
    {
      title: "Love",
      description: "an album about love by Jennifer Lopez",
      previewImage: "image url",
      userId: 3
    },

    // 5
    {
      title: "Head In The Clouds",
      description: "an album by Kaynomic",
      previewImage: "image url",
      userId: 4
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
