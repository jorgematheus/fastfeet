import Sequelize, { Model } from 'sequelize';

export default class Signature extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/uploads/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
