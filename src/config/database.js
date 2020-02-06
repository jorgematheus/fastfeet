require('dotenv/config');

if (process.env.NODE_DB === 'postgres') {
  module.exports = {
    dialect: process.env.PG_DB_DIALECT,
    host: process.env.PG_DB_HOST,
    username: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS,
    database: process.env.PG_DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      /** por padrao, o sequelize cria as tabelas com alguns padroes,
        um deles é colocar "s" no final do nome da tabela, usando 
       freezaTableName = true, tiramos essas regras.
       * */
    },
  };
} else {
  module.exports = {
    dialect: process.env.MYSQL_DB_DIALECT,
    host: process.env.MYSQL_DB_HOST,
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      /** por padrao, o sequelize cria as tabelas com alguns padroes,
        um deles é colocar "s" no final do nome da tabela, usando 
       freezaTableName = true, tiramos essas regras.
       * */
      // freezeTableName: true,
    },
  };
}
