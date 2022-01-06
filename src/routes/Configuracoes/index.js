// Controller
import ConfiguracoesController from '../../app/controllers/ConfiguracoesController';
import Configuracoes from '../../app/models/Configuracoes';

// Validação
// import NOME from '../../app/validators/NOME/NOME';

// Permissões
// import NOME from '../../app/Roles/NOME';

export default (routes, auth) => {
  // Routes Public

  routes.get(
    '/api/v1/configuracoes/manutencao/check',
    ConfiguracoesController.checkManutencao
  );

  routes.get(
    '/api/v1/configuracoes/manutencao/mensagem',
    ConfiguracoesController.getManutencaoMensagem
  );

  routes.put(
    '/api/v1/configuracoes/manutencao/mensagem',
    ConfiguracoesController.editMensagemManutencao,
    auth
  );

  routes.put(
    '/api/v1/configuracoes/manutencao/check',
    ConfiguracoesController.editStatusManutencao,
    auth
  );

  routes.get(
    '/api/v1/configuracoes/redessociais',
    ConfiguracoesController.getRedesSociais
  );

  routes.get('/api/v1/configuracoes/ip', ConfiguracoesController.getIP);
};
