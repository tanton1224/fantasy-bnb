'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
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
