import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';

import databaseConfig from '../config/database';
import Package from '../app/models/Package';
import Signature from '../app/models/Signature';

// registra os models na constante
const models = [User, Recipient, Deliveryman, File, Package, Signature];

// classe respomsável por passar a instancia do Sequelize com a configuração da
// database para todos nossos models

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
