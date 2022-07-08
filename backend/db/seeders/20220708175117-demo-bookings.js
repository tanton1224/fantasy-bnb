'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 3,
        startDate: "2022-09-10",
        endDate: "2022-09-15",
        userId: 2
      },
      {
        spotId: 2,
        startDate: "2022-09-10",
        endDate: "2022-09-15",
        userId: 1
      },
      {
        spotId: 1,
        startDate: "2022-09-10",
        endDate: "2022-09-15",
        userId: 3
      },
     ])
  },

  async down (queryInterface, Sequelize) {
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Bookings', {
       spotId: { [Op.in]: [1, 2, 3] }
     }, {})
  }
};
