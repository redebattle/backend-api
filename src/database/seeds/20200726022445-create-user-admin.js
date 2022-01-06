const bcrypt = require('bcryptjs');

module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'Administrador',
          email: 'admin@cubebox.com.br',
          senha_hash: bcrypt.hashSync('123456789', 8),
          nivel: 'ADMIN',
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
      'usuarios',
      { email: { [Op.in]: ['admin@cubebox.com.br'] } },
      {}
    );
  },
};
