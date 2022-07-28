'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url: "https://static.wikia.nocookie.net/harrypotter/images/e/e1/Hogwarts_Castle_DHF2.jpg/revision/latest?cb=20120128145344",
      },
      {
        spotId: 1,
        url: "https://images.ctfassets.net/usf1vwtuqyxm/3QQaEkThAnIAiXveGhJYD9/f79a571dbe9fd456d65e783040601fdc/hogwarts-castle-.jpg",
      },
      {
        spotId: 1,
        url: "https://static.wikia.nocookie.net/harrypotter/images/d/d3/Hogwarts_Quidditch_Pitch_in_1996_HBPF.jpg/revision/latest?cb=20210719213600",
      },
      {
        spotId: 1,
        url: "https://lp-cms-production.imgix.net/2020-10/The%20Dorm3%20North%20Shire%2C%20cCAG.JPG",
      },
      {
        spotId: 1,
        url: "https://static.wikia.nocookie.net/harrypotter/images/6/62/Chamber.png/revision/latest/scale-to-width-down/1200?cb=20180613173723",
      },
      {
        spotId: 2,
        url: "image-url",
      },
     ])
  },

  async down (queryInterface, Sequelize) {

  }
};
