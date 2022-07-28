'use strict';

const { Op } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "Who ever really knows?",
        city: "Dufftown",
        state: "Moray",
        country: "Scotland",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Hogwarts",
        description: "A magical location filled with fun and death! Don't mind the giant snakes in the Chamber of secrets or all the werewolves in the forest!",
        price: 200
      },
      {
        ownerId: 2,
        address: "22 Helms Deep Place",
        city: "Eudras",
        state: "West Emnet",
        country: "Middle Earth",
        name: "Helm's Deep",
        description: "With the orc scourge pushed back, this lovely location is open to all! Come visit the starry caves featured behihnd the citadel!",
        price: 300
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
      {
        ownerId: 4,
        address: "1200 Supreme Dr.",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        name: "The placeholder",
        description: "A placeholding location",
        price: 100
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
