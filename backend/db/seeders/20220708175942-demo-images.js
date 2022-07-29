'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url: "https://images.ctfassets.net/usf1vwtuqyxm/3QQaEkThAnIAiXveGhJYD9/f79a571dbe9fd456d65e783040601fdc/hogwarts-castle-.jpg",
      },
      {
        spotId: 1,
        url: "https://static.wikia.nocookie.net/harrypotter/images/d/d3/Hogwarts_Quidditch_Pitch_in_1996_HBPF.jpg",
      },
      {
        spotId: 1,
        url: "https://lp-cms-production.imgix.net/2020-10/The%20Dorm3%20North%20Shire%2C%20cCAG.JPG",
      },
      {
        spotId: 1,
        url: "https://static.wikia.nocookie.net/harrypotter/images/6/62/Chamber.png",
      },
      {
        spotId: 2,
        url: "https://64.media.tumblr.com/05813a216ca545b1205306073f8eabf0/e1cc60d81d64240d-95/s1280x1920/df750a9906b3088a224fa2a2f191526245f69e15.jpg",
      },
      {
        spotId: 3,
        url: "https://cdna.artstation.com/p/assets/images/images/012/910/872/large/clayscence-art-lee2-2.jpg?1537148145",
      },
      {
        spotId: 4,
        url: "https://cdna.artstation.com/p/assets/images/images/012/910/872/large/clayscence-art-lee2-2.jpg?1537148145",
      },
     ])
  },

  async down (queryInterface, Sequelize) {

  }
};
