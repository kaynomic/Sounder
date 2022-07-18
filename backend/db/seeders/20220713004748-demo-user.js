'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      // 1
      {
        firstName: "Joe",
        lastName: "Rogan",
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },

      // 2
      {
        firstName: "Jon",
        lastName: "Smith",
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },

      // 3
      {
        firstName: "Jennifer",
        lastName: "Lopez",
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },

      // 4
      {
        firstName: "Kirlbert",
        lastName: "Mendez",
        email: 'kaynomic@user.com',
        username: 'Kaynomic',
        hashedPassword: bcrypt.hashSync('password4')
      },

      // 5
      {
        firstName: "Josh",
        lastName: "Santiago",
        email: 'joshy@user.com',
        username: 'JoshyWashy',
        hashedPassword: bcrypt.hashSync('password5')
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
