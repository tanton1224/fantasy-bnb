'use strict';

const { Op } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "100 Waverly Place",
        city: "Charlotte",
        state: "North Carolina",
        country: "United States of America",
        name: "Wizards Residence",
        description: "A magical location",
        price: 250
      },
      {
        ownerId: 3,
        address: "5200 Hogwarts Drive",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        name: "Wizarding School",
        description: "A studious location",
        price: 400
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ["123 Disney Lane", "100 Waverly Place", "5200 Hogwarts Drive"] }
    }, {});
  }
};
