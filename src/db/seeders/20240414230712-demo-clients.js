'use strict';

let clients = [
  {
    accountNumber: "AA0012",
    lastName: "Casimir",
    middleName: "Gladys",
    firstName: "Montezima",
    dateOfBirth: "2000-03-12",
    inn: "732703543043",
    fioResponsable: 1
  },
  {
    accountNumber: "BB0123",
    lastName: "Ivanov",
    middleName: "Sergei",
    firstName: "Petrovich",
    dateOfBirth: "1995-08-21",
    inn: "123456789012",
    fioResponsable: 2
  },
  {
    accountNumber: "CC0345",
    lastName: "Garcia",
    middleName: "Maria",
    firstName: "Lopez",
    dateOfBirth: "1983-04-30",
    inn: "987654321089",
    fioResponsable: 1
  },
  {
    accountNumber: "DD0456",
    lastName: "Smith",
    middleName: "Anne",
    firstName: "Elizabeth",
    dateOfBirth: "1976-12-05",
    inn: "456789012377",
    fioResponsable: 1
  },
  {
    accountNumber: "EE0567",
    lastName: "Chen",
    middleName: "Hua",
    firstName: "Wang",
    dateOfBirth: "1990-07-15",
    inn: "888777666555",
    fioResponsable: 1
  },
  {
    accountNumber: "FF0678",
    lastName: "Dubois",
    middleName: "Marie",
    firstName: "Claire",
    dateOfBirth: "1988-10-25",
    inn: "333222111000",
    fioResponsable: 1
  },
  {
    accountNumber: "GG0789",
    lastName: "Kim",
    middleName: "Ji",
    firstName: "Young",
    dateOfBirth: "1979-02-17",
    inn: "987654321099",
    fioResponsable: 1
  },
  {
    accountNumber: "HH0890",
    lastName: "Martinez",
    middleName: "Jose",
    firstName: "Luis",
    dateOfBirth: "1994-06-28",
    inn: "123456789011",
    fioResponsable: 2
  },
  {
    accountNumber: "II0901",
    lastName: "Müller",
    middleName: "Helena",
    firstName: "Sophie",
    dateOfBirth: "1985-09-03",
    inn: "732703543044",
    fioResponsable: 1
  },
  {
    accountNumber: "JJ1012",
    lastName: "Brown",
    middleName: "David",
    firstName: "Michael",
    dateOfBirth: "1973-11-09",
    inn: "456789012378",
    fioResponsable: 2
  }
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', clients, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
