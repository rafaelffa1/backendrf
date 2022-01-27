const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require("util");
let db = new sqlite3.Database(dbPath);
const knex = require("../dbConnection");

// Table enderecos
//  ID INTEGER PRIMARY KEY AUTOINCREMENT,
//  estado varchar(255),
//  cidade varchar(255),
//  bairro varchar(255),
//  endereco varchar(255),
//  numero varchar(255),
//  lat varchar(255),
//  long varchar(255)

exports.insertEnderecos = async function (data, callback) {
  const trx = await knex.transaction();

  const novoEnd = {
    cep: data.cep,
    estado: data.estado,
    cidade: data.cidade,
    bairro: data.bairro,
    endereco: data.endereco,
    numero: data.numero,
    lat: data.lat,
    long: data.long,
    usuarioID: data.usuarioID,
  };

  const idsInseridos = await trx("enderecos").insert(novoEnd);
  callback(idsInseridos[0]);

  await trx.commit();
};

exports.selectAllEnderecos = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM enderecos", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.selectIdEnderecos = function (callback, idProduto) {
  db.serialize(function () {
    db.all(
      `SELECT * FROM enderecos WHERE ID == ${idProduto}`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      }
    );
  });
};

exports.deleteEnderecos = function (idProduto) {
  db.run(`DELETE FROM enderecos WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
};

exports.atualizarEndereco = function (data) {
  db.run(
    `UPDATE enderecos SET
    cep = '${data.cep}',
    estado = '${data.estado}',
    cidade = '${data.cidade}',
    bairro = '${data.bairro}',
    endereco = '${data.endereco}',
    numero = ${data.numero},
    lat = ${data.lat},
    long = ${data.long}
    WHERE ID == ${data.enderecoID}`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};
