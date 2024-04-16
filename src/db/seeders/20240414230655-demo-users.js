'use strict';

let users = [
  {
    fio: 'Montezima Daniel Moise',
    login: 'dev',
    password:'$2b$10$cDNwJywJn0WoYxO7nXxOjeLpYoPn2AbFH/VO1HV/cN32y4YOglfWy', //aton@intership2024A
  },
  {
    fio: 'Aton villa Sanchez',
    login: 'internship',
    password:'$2b$10$cDNwJywJn0WoYxO7nXxOjeLpYoPn2AbFH/VO1HV/cN32y4YOglfWy', //aton@intership2024A
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
