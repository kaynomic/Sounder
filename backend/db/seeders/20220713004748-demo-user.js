'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      // 1
      {
        firstName: "Joe",
        lastName: "Rogan",
        username: 'Demo-lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        previewImage: "image url"
      },

      // 2
      {
        firstName: "Ian",
        lastName: "Vogt",
        username: 'FakeUser1',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2'),
        previewImage: "image url"
      },

      // 3
      {
        firstName: "Jennifer",
        lastName: "Lopez",
        username: 'FakeUser2',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3'),
        previewImage: "image url"
      },

      // 4
      {
        firstName: "Kirlbert",
        lastName: "Mendez",
        username: 'Kaynomic',
        email: 'kaynomic@user.com',
        hashedPassword: bcrypt.hashSync('password4'),
        previewImage: "image url"
      },

      // 5
      {
        firstName: "Josh",
        lastName: "Santiago",
        username: 'JoshyWashy',
        email: 'joshy@user.com',
        hashedPassword: bcrypt.hashSync('password5'),
        previewImage: "image url"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
