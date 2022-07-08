'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return await queryInterface.bulkInsert('Reviews', [
    {
      spotId: 3,
      stars: 4,
      reviewContent: "This is a review from User 2!",
      userId: 2
    },
    {
      spotId: 2,
      stars: 5,
      reviewContent: "This is a review from User 1!",
      userId: 1
    },
    {
      spotId: 1,
      stars: 3,
      reviewContent: "This is a review from User 3!",
      userId: 3
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
