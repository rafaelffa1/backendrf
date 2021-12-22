const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require('util')

// Table categorias
// ID INTEGER PRIMARY KEY AUTOINCREMENT,
// nome_categoria varchar(255),
// imagem varchar(255),
// status NUMBER,

let db = new sqlite3.Database(dbPath);

exports.selectAllCategorias = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM categorias", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}


exports.selectIDCategorias = function (categoriaID, callback) {
  db.serialize(function () {
    db.all(`SELECT * FROM categorias WHERE ID == ${categoriaID}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}