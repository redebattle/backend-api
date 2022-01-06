module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          nome: 'CATEGORIA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'AUTOR',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(
      'roles',
      { nome: { [Op.in]: ['CATEGORIA', 'AUTOR'] } },
      {}
    );
  },
};
