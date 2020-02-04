import Sequelize, { Model } from 'sequelize';

export default class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING(2),
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
