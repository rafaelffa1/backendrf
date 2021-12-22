const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
var moment = require('moment');

let db = new sqlite3.Database(dbPath);

exports.insertPremiacao = function (params) {
  db.serialize(function () {
    db.all(`INSERT INTO premiacoes ( rifaID, titulo, descricao, enderecoID, tipo, usuarioCriador, status, data_criacao) VALUES(?,?,?,?,?,?,?,?)`,
      [params.rifaID, params.titulo, params.descricao, params.enderecoID, params.tipo, 1, params.usuarioCriador, moment().format('MMMM Do YYYY, h:mm:ss a')],
      function (err) {
        if (err != null) {
          console.log(`Erro ao inserir premiacao - ${err}`);
        }
      });
  });
}

exports.selectPremiacao = function (rifaID, callback) {
  db.serialize(function () {
    db.all(`SELECT * FROM premiacoes WHERE premiacoes.rifaID == ${rifaID}`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      });
  });
}

