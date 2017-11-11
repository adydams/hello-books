module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Roles', [{
      title: 'admin',
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'regular',
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Person', null, {})
};