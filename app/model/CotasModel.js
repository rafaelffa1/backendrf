const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
var moment = require("moment");

let db = new sqlite3.Database(dbPath);

exports.insertCotas = function (jsonReceived, callback) {
  db.serialize(function () {
    db.all(
      `INSERT INTO cotas ( rifaID, usuario_vendedor, usuario_comprador, cotaHash, data_criacao) VALUES(?,?,?,?,?)`,
      [
        jsonReceived.rifaID,
        jsonReceived.usuario_vendedor,
        jsonReceived.usuario_comprador,
        jsonReceived.hashCode,
        moment().format("MMMM Do YYYY, h:mm:ss a"),
      ],
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      }
    );
  });
};

exports.getCotaRifa = function (rifaID, callback) {
  db.serialize(function () {
    db.all(
      `SELECT  
      cotas.ID,
      cotas.cotaHash,
      usuarios.ID as usuarioID,
      usuarios.nome,
      usuarios.sobrenome,
      rifas.ID as rifaID,
      rifas.titulo_rifa,
      rifas.desc_rifa,
      rifas.valor,
      rifas.status,
      rifas.data_criacao,
      rifas.data_aceite,
      rifas.data_sorteio,
      rifas.cota_venc
      FROM cotas
      INNER JOIN usuarios ON cotas.usuario_comprador = usuarios.ID
      INNER JOIN rifas ON cotas.rifaID = rifas.ID
      WHERE cotas.rifaID == ${rifaID}`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      }
    );
  });
};

exports.getCotaRifaUser = function (usuarioID, callback) {
  db.serialize(function () {
    db.all(
      `SELECT  
      cotas.ID,
      cotas.cotaHash,
      usuarios.ID,
      usuarios.nome,
      usuarios.sobrenome,
      rifas.ID as rifaID,
      rifas.titulo_rifa,
      rifas.desc_rifa,
      rifas.valor,
      rifas.status,
      rifas.data_criacao,
      rifas.data_aceite,
      rifas.data_sorteio,
      rifas.cota_venc
      FROM cotas
      INNER JOIN usuarios ON cotas.usuario_comprador = usuarios.ID
      INNER JOIN rifas ON cotas.rifaID = rifas.ID
      WHERE cotas.usuario_comprador == ${usuarioID}`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      }
    );
  });
};

exports.getWinnerRaffle = function (quoataID, callback) {
  db.serialize(function () {
    db.all(
      `SELECT  
      cotas.ID,
      cotas.cotaHash,
      usuarios.ID,
      usuarios.nome,
      usuarios.sobrenome,
      usuarios.celular,
      enderecos.cep,
      enderecos.estado,
      enderecos.cidade,
      enderecos.bairro,
      enderecos.endereco,
      enderecos.numero
      FROM cotas
      INNER JOIN usuarios ON cotas.usuario_comprador = usuarios.ID
      INNER JOIN enderecos ON usuarios.enderecoID = enderecos.ID
      WHERE cotas.ID == ${quoataID}`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      }
    );
  });
};
