'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define schema in options object
}

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: "Demo",
        lastName: 'Lition',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: "Bob",
        lastName: 'Smith',
        username: 'BobSmith1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: "Stacy's",
        lastName: 'Mom',
        username: 'gotitgoingon',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'drewanton20@gmail.com',
        firstName: "Drew",
        lastName: 'Anton',
        username: 'drewanton20',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
