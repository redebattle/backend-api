module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'CATEGORIA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'AUTOR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(
      'roles',
      { nome: { [Op.in]: ['CATEGORIA', 'AUTOR'] } },
      {}
    );
  },
};
