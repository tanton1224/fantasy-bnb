'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Images', [
      {
        spotId: 3,
        url: "image-url",
      },
      {
        spotId: 2,
        url: "image-url",
      },
      {
        spotId: 1,
        url: "image-url",
      },
      {
        spotId: 3,
        reviewId: 1,
        url: "image-url",
      },
      {
        spotId: 2,
        reviewId: 2,
        url: "image-url",
      },
      {
        spotId: 1,
        reviewId: 3,
        url: "image-url",
      },
     ])
  },

  async down (queryInterface, Sequelize) {

  }
};
