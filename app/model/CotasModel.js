const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
var moment = require('moment');

let db = new sqlite3.Database(dbPath);

exports.insertCotas = function (jsonReceived, callback) {
  db.serialize(function () {
    db.all(`INSERT INTO cotas ( rifaID, usuario_vendedor, usuario_comprador, cotaHash, data_criacao) VALUES(?,?,?,?,?)`,
      [jsonReceived.rifaID, jsonReceived.usuario_vendedor, jsonReceived.usuario_comprador, jsonReceived.hashCode, moment().format('MMMM Do YYYY, h:mm:ss a')],
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      });
  });
}

exports.getCotaRifa = function (rifaID, callback) {
  db.serialize(function () {
    db.all(`SELECT * FROM cotas WHERE cotas.rifaID == ${rifaID}`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      });
  });
}

