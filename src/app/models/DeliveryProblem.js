import Sequelize, { Model } from 'sequelize';

export default class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        delivery_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Package, { foreignKey: 'delivery_id', as: 'delivery' });
  }
}
