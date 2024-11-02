'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Post',
      [
        {
          title: 'title template 1',
          content: 'content template 1',
          image: 'image template 1',
          original_link: 'origin link template 1'
        },
        {
          title: 'title template 2',
          content: 'content template 2',
          image: 'image template 2',
          original_link: 'origin link template 2'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
