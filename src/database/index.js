import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

// registra os models na constante
const models = [User];

// classe respomsável por passar a instancia do Sequelize com a configuração da
// database para todos nossos models

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
