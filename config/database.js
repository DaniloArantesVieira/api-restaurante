require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.getConnection((erro, conexao) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:');
    console.error(erro.message);
    return;
  }

  console.log('Conectado ao banco de dados MariaDB/MySQL.');

  conexao.release();
});

module.exports = pool;