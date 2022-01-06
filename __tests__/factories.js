import faker from 'faker';
import { factory } from 'factory-girl';
import Categoria from '../src/app/models/Categoria';
import Autores from '../src/app/models/Autores';

// Faker Examples: https://rawgit.com/Marak/faker.js/master/examples/browser/index.html
// Faker DOC: https://github.com/marak/Faker.js/

//           Factory Name, Model Name
factory.define('Categoria', Categoria, {
  codigo: faker.random.number(),
  descricao: faker.random.words(),
});

const password = faker.internet.password();

factory.define('Usuario', Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: password,
  confirmarsenha: password,
});

factory.define('Autor', Autores, {
  nome: faker.name.findName(),
  profissao: faker.name.jobTitle(),
});

export default factory;
