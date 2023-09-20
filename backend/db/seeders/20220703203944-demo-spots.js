'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define schema in options object
}

const { Op } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "Who ever really knows?",
        city: "Dufftown",
        state: "Scotland",
        country: "Great Britain",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Hogwarts",
        description: "A magical location filled with fun and death! Don't mind the giant snakes in the Chamber of secrets or all the werewolves in the forest!",
        price: 200,
        previewImage: "https://static.wikia.nocookie.net/harrypotter/images/e/e1/Hogwarts_Castle_DHF2.jpg"
      },
      {
        ownerId: 2,
        address: "22 Helms Deep Place",
        city: "Eudras",
        state: "West Emnet",
        country: "Middle Earth",
        name: "Helm's Deep",
        description: "With the orc scourge pushed back, this lovely location is open to all! Come visit the starry caves featured behihnd the citadel!",
        price: 300,
        previewImage: "https://bigshinyrobot.com/wp-content/uploads/2016/12/helms-deep-1568x909.jpg"
      },
      {
        ownerId: 3,
        address: "5200 High Street",
        city: "Woodcroft",
        state: "Scotland",
        country: "Great Britain",
        name: "Hogsmeade",
        description: "A great place to visit with friends! Remember to pass your classes and don't get in trouble so you can come!",
        price: 400,
        previewImage: "https://i.pinimg.com/originals/f7/01/42/f7014231c6f006912157efd2ad4bfd33.jpg"
      },
      {
        ownerId: 4,
        address: "Wizard's Castle Lane",
        city: "Nowhere",
        state: "Kansas",
        country: "Oz",
        name: "The Wizard of Oz's Castle ",
        description: "The home the great Wizard of Oz!",
        price: 450,
        previewImage: "https://hips.hearstapps.com/hmg-prod/images/wizard-of-oz-palace-1613878358.jpg"
      },
      {
        ownerId: 2,
        address: "24 Bag-End",
        city: "Hobbiton",
        state: "The Shire",
        country: "Middle-Earth",
        name: "The Wizard of Oz's Castle ",
        description: "Wonderful for an afternoon luncheon, or a spot of tea with unexpected visitors",
        price: 350,
        previewImage: "https://www.newzealand.com/assets/Operator-Database/3fc2b5d066/img-1536162697-1401-3228-p-95B514EA-DAAA-9CB0-6839532442B3132A-2544003__aWxvdmVrZWxseQo_CropResizeWzk0MCw1MzAsNzUsImpwZyJd.jpg",
      },
      {
        ownerId: 4,
        address: "You'll know it when you see it",
        city: "Minas Tirith",
        state: "Anorien",
        country: "Gondor",
        name: "Minas Tirith",
        description: "The throne of Gondor",
        price: 1050,
        previewImage: "https://static.wikia.nocookie.net/lotr/images/e/e4/Minas_Tirith.jpg"
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
    options.tableName = 'Spots'
     return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ["123 Disney Lane", "100 Waverly Place", "5200 Hogwarts Drive"] }
    }, {});
  }
};
